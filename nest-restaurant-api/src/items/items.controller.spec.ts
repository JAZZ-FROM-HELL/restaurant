import { Test } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import {Item} from "./item";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateItemDto} from "./create-item.dto";

describe('ItemsController', () => {

    const items:Item[] = [
        {
            id: 1,
            name: 'vBurger',
            price: 3,
        },
        {
            id: 2,
            name: 'vPizza',
            price: 4,
        },
        {
            id: 3,
            name: 'salad',
            price: 2,
        }
    ];

    let itemsController: ItemsController;
    let itemsService: ItemsService;
    let itemsRepo: Repository<Item>;

    function getNewItemId():number {
        return Math.max(...items.map((item) => item.id)) + 1;
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [ItemsService,
                {
                    provide: getRepositoryToken(Item),
                    useClass: Repository,
                }],
        }).compile();

        itemsService = moduleRef.get<ItemsService>(ItemsService);
        itemsController = moduleRef.get<ItemsController>(ItemsController);
        itemsRepo = moduleRef.get<Repository<Item>>(getRepositoryToken(Item));

        // Mock implementations
        jest.spyOn(itemsService,'findAll').mockImplementation(() => Promise.resolve(items));
        jest.spyOn(itemsService, 'create').mockImplementation(
            (item:Item) => Promise.resolve({...item, id: getNewItemId()})
            );
    });

    describe('findAll', () => {
        it('should return an identical array of items', async () => {
            const result:Item[] = await itemsController.findAll();
            expect(result).toBe(items);
        })
    })

    describe('create', () => {

        const createItemDto:CreateItemDto = {
            id:undefined,
            name: 'Hummus',
            price: 2,
        };

        it('should push an item', async () => {
            expect(await itemsController.create(createItemDto))
                .toStrictEqual({...createItemDto, id: getNewItemId()});
        });
    });
});
