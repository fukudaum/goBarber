import UserToken from "modules/users/entities/UserToken";
import { UserTokenRepository } from "../userToken.repository";

export default class PrismaUserTokenRepository implements UserTokenRepository {
    generate(user_id: string): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

}
