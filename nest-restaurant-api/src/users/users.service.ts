import { Injectable } from '@nestjs/common';
import {User} from "./user";
import {Role} from "./role";

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                username: 'john',
                password: 'changeme',
                firstName: 'john',
                lastName: 'kreese',
                role: Role.USER,
            },
            {
                id: 2,
                username: 'chris',
                password: 'secret',
                firstName: 'chris',
                lastName: 'scarlett',
                role: Role.USER,
            },
            {
                id: 3,
                username: 'maria',
                password: 'guess',
                firstName: 'maria',
                lastName: 'del mar',
                role: Role.ADMIN,
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}