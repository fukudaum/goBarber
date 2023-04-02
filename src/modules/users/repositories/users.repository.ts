import FindAllProvidersDTO from "../dtos/FindAllProviders.dto";
import User from "../entities/User";

export interface UsersRepository {
    find(): Promise<User[]>;
    findUnique(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: any): Promise<User | undefined>;
    delete(userId: string): Promise<User>;
    updateAvatar(avatar: string, userId: string): Promise<User>;
    updatePassword(userId: string, password: string): Promise<void>;
    update(userId: string, name: string, email: string, password?: string): Promise<User>;
    findAllProviders({ exceptUserId }: FindAllProvidersDTO): Promise<User[]>;
}

