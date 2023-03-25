import UserToken from "modules/users/entities/UserToken";
import { UserTokenRepository } from "../userToken.repository";
import { uuid } from 'uuidv4';

export default class FakeUserTokenRepository implements UserTokenRepository {
    private usersToken: UserToken[] = [];
    async generate(user_id: string): Promise<UserToken> {
        const userToken: UserToken = {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        }

        this.usersToken.push(userToken);

        return userToken;
    }

}
