import User from "../../entities/User";
import { prismaClient } from "../../database/prisma.service";
import { UsersRepository } from "../users.repository";

export class CreateUserDto {
    name: string
    password: string
    email: string
  }
export class PrismaUserRepository implements UsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async find(): Promise<User[]> {
        return await prismaClient.user.findMany();
    }

    async findUnique(userId: string): Promise<User | null> {
        return await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });
    }

    async create({name,
        password,
        email} : CreateUserDto): Promise<User | undefined> {
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

    async updateAvatar(avatar: string, userId: string): Promise<User> {
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