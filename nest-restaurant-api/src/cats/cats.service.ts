import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {

    private readonly cats = ['Domi','Oli','Findasson','Mini','Klaus','Mogli','Milo'];

    findAll(): string[] {
        return this.cats;
    }

    create(cat:string) {
        this.cats.push(cat);
    }

}
