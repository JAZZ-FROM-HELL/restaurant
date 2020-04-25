import {Item} from "./item";

export const items:Item[] = [
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

export function getNewItemId():number {
    return Math.max(...items.map((item) => item.id)) + 1;
};
