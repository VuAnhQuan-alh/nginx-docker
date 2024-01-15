import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../models/service.repository';
import { CreateServiceDTO } from '../dto/create-service.dto';
import { ServiceDocument } from '../models/service.schema';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async create(data: CreateServiceDTO): Promise<ServiceDocument> {
    return await this.serviceRepo.create({ ...data });
  }

  async findAll(): Promise<[ServiceDocument[], number]> {
    return await this.serviceRepo.findAndCount({});
  }
}
