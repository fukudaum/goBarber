import User from 'modules/users/entities/User';
import AppError from '../../../../shared/errors/AppErrors';
import { uuid } from 'uuidv4';
import { UsersRepository } from '../users.repository';
import FindAllProvidersDTO from 'modules/users/dtos/FindAllProviders.dto';

export interface CreateUserDto {
    name: string
    password: string
    email: string
}

export class FakeUsersRepository implements UsersRepository {
    private users: User[] = [];

    async findAllProviders({ exceptUserId }: FindAllProvidersDTO): Promise<User[]> {
        let users = this.users;

        if(exceptUserId) {
            users = this.users.filter((item) => {
                return item.id !== exceptUserId
            });
        }

        if(!users?.length) {
            throw new AppError('Users not found!');
        }

        return users;
    }

    async update(userId: string, name: string, email: string, password?: string, oldPassword?: string): Promise<User> {
        const user = this.users.find((item) => {
            return item.id === userId
        });

        if(!user) {
            throw new AppError('User not found!');
        }

        const userAlreadyExisting = this.users.find((item) => {
            return item.email === email
        });

        if(userAlreadyExisting) {
            throw new AppError('Email already registered!');
        }

        if(password) {
            user.password = password
        }

        user.name = name;
        user.email = email;

        return user;
    }

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
        email
    } : CreateUserDto): Promise<User> {
        try {
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
        } catch (error) {
            throw new AppError('Error creating User');
        }

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
