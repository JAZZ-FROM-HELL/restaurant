import { IsString, IsInt } from 'class-validator';
import { Item } from "../../dist/items/item.interface";

export class CreateItemDto extends Item {

    @IsString() readonly name: string;

    @IsInt() readonly price: number;

}