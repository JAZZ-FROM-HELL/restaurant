import {CreateItemDto} from "../items/create-item.dto";

export interface CRUDService<T> {
    findAll(): Promise<T[]>;
    create(createItemDto: CreateItemDto): Promise<T>;
}
