import {Item} from "./item";

export const items:Item[] = [
    {
        id: 1,
        name: 'mockBurger',
        price: 3,
    },
    {
        id: 2,
        name: 'mockPizza',
        price: 4,
    },
    {
        id: 3,
        name: 'mockSalad',
        price: 2,
    }
];

export function getNewItemId():number {
    return Math.max(...items.map((item) => item.id)) + 1;
};
