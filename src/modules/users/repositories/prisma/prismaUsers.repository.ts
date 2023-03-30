import User from "modules/users/entities/User";
import AppError from "../../../../shared/errors/AppErrors";

import { prismaClient } from "../../../../shared/infra/database/prisma.service";
import { UsersRepository } from "../users.repository";

export interface CreateUserDto {
    name: string
    password: string
    email: string
}

export class PrismaUserRepository implements UsersRepository {
    async update(userId: string, name: string, email: string, password: string): Promise<User> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        let updatedPassword = user?.password;

        if(password) {
            updatedPassword = password
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email,
                password: updatedPassword
            }
        });

        if(!updatedUser) {
            throw new AppError('User not found!');
        }

        return updatedUser;
    }

    async updatePassword(userId: string, password: string): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                password
            }
        });
    }

    async findByEmail(email: string): Promise<any | null> {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async find(): Promise<any[]> {
        return await prismaClient.user.findMany();
    }

    async findUnique(userId: string): Promise<any | null> {
        return await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });
    }

    async create({name,
        password,
        email} : CreateUserDto): Promise<any | undefined> {
        try {
            return await prismaClient.user.create({
                data: {
                    name,
                    password,
                    email
                }
            });
        } catch (error) {
           console.log(error)
        }
    }

    async delete(userId: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async updateAvatar(avatar: string, userId: string): Promise<any> {
        return await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                avatar: avatar
            }
        })
    }
}
