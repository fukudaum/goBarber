import UserToken from "modules/users/entities/UserToken";
import { UserTokenRepository } from "../userToken.repository";
import { uuid } from 'uuidv4';

export default class FakeUserTokenRepository implements UserTokenRepository {
    private usersToken: UserToken[] = [];

    async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.usersToken.find( (item) => {
            return item.token === token
        });

        return userToken;
    }

    async generate(user_id: string): Promise<UserToken> {
        const userToken: UserToken = {
            id: uuid(),
            token: uuid(),
            user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.usersToken.push(userToken);

        return userToken;
    }

}
