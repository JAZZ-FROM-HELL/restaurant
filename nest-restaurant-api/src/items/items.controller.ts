import {Get, Post, Controller, Body, UsePipes, UseGuards} from '@nestjs/common';
import { CreateItemDto } from './create-item.dto';
import { ItemsService } from './items.service';
import { Item } from "./item";
import { ValidationPipe } from "../common/validation.pipe";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async create(@Body() createItemDto: CreateItemDto):Promise<Item> {
        return this.itemsService.create(createItemDto);
    }

}
