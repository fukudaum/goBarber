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

    async updatePassword(userId: string, password: string): Promise<void> {
        const user = this.users.find((item) => {
            return item.id === userId
        });

        if(user) {
            user.password = password;
        }
    }

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

    async delete(userId: string): Promise<User> {
        const userIndex = this.users.findIndex((item) => {
            return item.id === userId
        });

        const foundUser = this.users.splice(userIndex, 1);

        return foundUser[0];
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
