import UserToken from "../entities/UserToken";

export interface UserTokenRepository {
    generate(user_id: string): Promise<UserToken>;
}
