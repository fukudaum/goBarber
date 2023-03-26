import UserToken from "modules/users/entities/UserToken";
import { UserTokenRepository } from "../userToken.repository";

export default class PrismaUserTokenRepository implements UserTokenRepository {
    async findByToken(token: string): Promise<UserToken | undefined> {
        throw new Error("Method not implemented.");
    }

    async generate(user_id: string): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

}
