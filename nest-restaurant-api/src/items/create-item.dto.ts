import { IsString, IsInt } from 'class-validator';
import {Item} from "./item";

export class CreateItemDto extends Item {

    @IsString() readonly name: string;

    @IsInt() readonly price: number;

}
