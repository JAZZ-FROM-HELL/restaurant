import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {Item} from '../src/items/item';
import {getNewItemId, items} from '../src/items/mock.items';
import {CreateItemDto} from '../src/items/create-item.dto';

describe('Items', () => {
    let app: INestApplication;
    let itemsRepo: Repository<Item>;
    let configService: ConfigService;
    let token:string;

    beforeAll(async () => {

       const moduleRef = await Test.createTestingModule({
           imports: [AppModule],
       }).compile();

       app = moduleRef.createNestApplication();
       itemsRepo = moduleRef.get<Repository<Item>>(getRepositoryToken(Item));
       configService = moduleRef.get<ConfigService>(ConfigService);

       await app.init();
    });

    // init database
    beforeEach(async () => {
        await itemsRepo.clear().then(() => { itemsRepo.save(items)});
    });

    // login
    beforeEach( async () => {
        await request(app.getHttpServer())
            .post('/login')
            .send({ username: 'john', password: 'changeme' })
            .expect(HttpStatus.CREATED)
            .expect((res) => {
                token = res.body.token;
        });
    });

    it('/GET items', () => {
        return request(app.getHttpServer())
            .get('/items')
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.OK)
            .expect(items);
    });

    it('/GET item unauthorized', () => {
        token = 'wrongtoken';
        return request(app.getHttpServer())
            .get('/items')
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.UNAUTHORIZED);
    });

    it('/POST item', () => {
        const createItemDto:CreateItemDto = { id: undefined, name: 'mockHummus', price: 3 };
        return request(app.getHttpServer())
           .post('/items')
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Authorization', `Bearer ${token}`)
           .send(createItemDto)
           .expect(HttpStatus.CREATED)
           .expect({...createItemDto, id: getNewItemId()});
    });

    afterAll(async () => {
        await app.close();
    });

});
