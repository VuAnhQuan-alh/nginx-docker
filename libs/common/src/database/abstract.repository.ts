import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import {
  FilterQuery,
  Model,
  PopulateOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { MessageQuery } from '../constant/messages';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const data = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await data.save()).toJSON() as unknown as TDocument;
  }

  async findOne(
    query: FilterQuery<TDocument>,
    populate?: PopulateOptions[],
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(query, {}, { lean: true })
      .populate(populate);
    if (!document) {
      this.logger.warn('Document not fond with filter', query);
      throw new NotFoundException('Document not found.');
    }
    return document as TDocument;
  }

  async findOneAndUpdate(
    query: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findByIdAndUpdate(query, update, {
      lean: true,
      new: true,
    });
    if (!document) {
      this.logger.warn('Document not fond with filter', query);
      throw new NotFoundException('Document not found.');
    }
    return document as TDocument;
  }

  async find(query: FilterQuery<TDocument>): Promise<TDocument[]> {
    return (await this.model.find(
      query,
      {},
      { lean: true },
    )) as unknown as TDocument[];
  }

  async findAndCount(
    query: FilterQuery<TDocument>,
    populate?: PopulateOptions[],
  ): Promise<[TDocument[], number]> {
    return [
      (await this.model
        .find(query, {}, { lean: true })
        .populate(populate)) as unknown as TDocument[],
      await this.model.countDocuments(query, { lean: true }),
    ];
  }

  async findOneAndDelete(query: FilterQuery<TDocument>) {
    const result = await this.model.findOneAndDelete(query, { lean: true });
    if (result) return result;
    throw new NotFoundException(MessageQuery.NOT_FOUND_DATA);
  }
}
