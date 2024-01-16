import { Injectable } from '@nestjs/common';
import { OwnerRepository } from '../models/owner.repository';
import { CreateOwnerDTO } from '../dto/create-owner.dto';
import { OwnerDocument } from '../models/owner.schema';
import { UpdateOwnerDTO } from '../dto/update-owner.dto';
import { PetDocument } from '../models/pet.schema';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class OwnersService {
  constructor(
    private readonly ownerRepo: OwnerRepository,
    private readonly petService: PetsService,
  ) {}

  async create(data: CreateOwnerDTO): Promise<OwnerDocument> {
    return await this.ownerRepo.create(data);
  }

  async findAll(): Promise<[OwnerDocument[], number]> {
    return await this.ownerRepo.findAndCount({});
  }

  async findOne(_id: string): Promise<OwnerDocument & { pets: PetDocument[] }> {
    const pets = await this.petService.findByOwnerId(_id);
    const result = await this.ownerRepo.findOne({ _id });
    return { ...result, pets };
  }

  async update(_id: string, data: UpdateOwnerDTO): Promise<OwnerDocument> {
    return await this.ownerRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.ownerRepo.findOneAndDelete({ _id });
  }
}
