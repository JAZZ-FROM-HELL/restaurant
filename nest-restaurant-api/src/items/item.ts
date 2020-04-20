import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
    @Column()
    name: string;

    @Column()
    price: number;

}
