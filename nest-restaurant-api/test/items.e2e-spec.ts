import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Repository } from "typeorm";
import {Item} from "../src/items/item";
import {getRepositoryToken} from "@nestjs/typeorm";
import {items} from "../src/items/mock.items";
import {CreateItemDto} from "../src/items/create-item.dto";

describe('Items', () => {
   let app: INestApplication;
   let itemsRepo: Repository<Item>;

   beforeAll(async () => {

       const moduleRef = await Test.createTestingModule({
           imports: [AppModule],
           providers: [
               {
                   provide: getRepositoryToken(Item),
                   useValue: itemsRepo,
               }
           ]
       }).compile();

       app = moduleRef.createNestApplication();
       await app.init();
   });

   it('/POST item', () => {
       const createItemDto:CreateItemDto = items[0];
       return request(app.getHttpServer())
           .post('/items')
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .send(createItemDto)
           .expect(200)
           .expect(items[0]);
   });

    it('/GET item', () => {
        return request(app.getHttpServer())
            .get('/items')
            .expect(200)
            .expect(items);
    });

    afterAll(async () => {
       await app.close();
   });

});
