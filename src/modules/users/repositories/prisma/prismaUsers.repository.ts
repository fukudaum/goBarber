import User from "@modules/users/entities/User";
import { prismaClient } from "@shared/infra/database/prisma.service";
import { UsersRepository } from "@modules/users/repositories/users.repository";

export interface CreateUserDto {
    name: string
    password: string
    email: string
}

export class PrismaUserRepository implements UsersRepository {
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

    async delete(): Promise<User> {
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
