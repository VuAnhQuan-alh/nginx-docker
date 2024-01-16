import { Injectable } from '@nestjs/common';
import { PetRepository } from '../models/pet.repository';
import { CreatePetDTO } from '../dto/create-pet.dto';
import { PetDocument } from '../models/pet.schema';
import { CommonService } from '@libs/common';
import { UpdatePetDTO } from '../dto/update-pet.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(
    private readonly petRepo: PetRepository,
    private readonly commonService: CommonService,
  ) {}

  async create(data: CreatePetDTO): Promise<PetDocument> {
    const code = this.commonService.getCodeHell('pets');
    return await this.petRepo.create({ ...data, code });
  }

  async findAll(
    query: FilterQuery<PetDocument>,
  ): Promise<[PetDocument[], number]> {
    return await this.petRepo.findAndCount(query, [{ path: 'ownerId' }]);
  }

  async findByOwnerId(_id: string): Promise<PetDocument[]> {
    return await this.petRepo.find({ ownerId: _id });
  }

  async findOne(_id: string): Promise<PetDocument> {
    return await this.petRepo.findOne({ _id });
  }

  async update(_id: string, data: UpdatePetDTO): Promise<PetDocument> {
    return await this.petRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.petRepo.findOneAndDelete({ _id });
  }
}
