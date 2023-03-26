import UserToken from "../entities/UserToken";

export interface UserTokenRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
