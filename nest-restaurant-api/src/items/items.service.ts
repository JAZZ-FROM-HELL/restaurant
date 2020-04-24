import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from "./item";
import { CRUDService } from "../common/crud.service";

@Injectable()
export class ItemsService implements CRUDService<Item> {
    constructor(
      @InjectRepository(Item)
      private readonly itemsRepository: Repository<Item>,
    ) {
    }

    create(createItemDto: CreateItemDto): Promise<Item> {
        const item = new Item();
        item.name = createItemDto.name;
        item.price = createItemDto.price;

        return this.itemsRepository.save(item);
    }

    async findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }
}
