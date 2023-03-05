import User from "../entities/User";
import { CreateUserDto } from "./prisma/prismaUsers.repository";


export interface UsersRepository {
    find(): Promise<User[]>;
    findUnique(): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(data: any): Promise<User | undefined>;
    delete(): Promise<User>;
    update(): Promise<User>;
}

