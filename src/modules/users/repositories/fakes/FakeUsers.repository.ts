import User from 'modules/users/entities/User';
import { uuid } from 'uuidv4';
import { UsersRepository } from '../users.repository';

export interface CreateUserDto {
    name: string
    password: string
    email: string
}

export class FakeUsersRepository implements UsersRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const findUser = this.users.find((user) => {
            return user.email === email
        });

        if(!findUser) {
            return null;
        }

        return findUser;
    }

    async find(): Promise<User[]> {
        return this.users;
    }

    async findUnique(userId: string): Promise<User | null> {
        const findUser = this.users.find((user) => {
            return user.id === userId
        });

        if(!findUser) {
            return null;
        }

        return findUser;
    }

    async create({name,
        password,
        email} : CreateUserDto): Promise<User | undefined> {

            const user: User = {
                email,
                name,
                password,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            this.users.push(user);
            return user;
    }

    async delete(): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async updateAvatar(avatar: string, userId: string): Promise<any> {
        const findUser = this.users.find((user) => {
            return user.id === userId
        });

        if(!findUser) {
            return null;
        }

        findUser.avatar = avatar;

        return findUser;
    }
}
