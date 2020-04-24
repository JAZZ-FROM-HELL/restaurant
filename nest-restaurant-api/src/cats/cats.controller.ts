import {Body, Controller, Get, Post} from '@nestjs/common';
import {CatsService} from "./cats.service";

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService:CatsService) {}


    @Get()
    findAll(): string[] {
        return this.catsService.findAll();
    }

    @Post()
    create(@Body() cat:string) {
        return this.catsService.create(cat);
    }

}
