import User from "../entities/User";

export interface UsersRepository {
    find(): Promise<User[]>;
    findUnique(): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(data: any): Promise<User | undefined>;
    delete(): Promise<User>;
    update(): Promise<User>;
}

