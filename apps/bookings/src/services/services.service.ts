import { CommonService } from '@libs/common';
import { Injectable } from '@nestjs/common';

import { CreateServiceDTO } from '../dto/create-service.dto';
import { UpdateServiceDTO } from '../dto/update-service.dto';
import { ServiceRepository } from '../models/service.repository';
import { ServiceDocument } from '../models/service.schema';

@Injectable()
export class ServicesService {
  constructor(
    private readonly serviceRepo: ServiceRepository,
    private readonly commonService: CommonService,
  ) {}

  async create(data: CreateServiceDTO): Promise<ServiceDocument> {
    const code = this.commonService.getCodeHell('serv');
    return await this.serviceRepo.create({ ...data, code });
  }

  async findAll(): Promise<[ServiceDocument[], number]> {
    return await this.serviceRepo.findAndCount({});
  }

  async findOne(_id: string): Promise<ServiceDocument> {
    return await this.serviceRepo.findOne({ _id });
  }

  async update(_id: string, data: UpdateServiceDTO): Promise<ServiceDocument> {
    return await this.serviceRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.serviceRepo.findOneAndDelete({ _id });
  }
}
