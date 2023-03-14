import User from "@modules/users/entities/User";

export interface UsersRepository {
    find(): Promise<User[]>;
    findUnique(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: any): Promise<User | undefined>;
    delete(): Promise<User>;
    updateAvatar(avatar: string, userId: string): Promise<User>;
}

