import UserToken from "modules/users/entities/UserToken";
import { UserTokenRepository } from "../userToken.repository";
import { prismaClient } from "shared/infra/database/prisma.service";

export default class PrismaUserTokenRepository implements UserTokenRepository {
    async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await prismaClient.userToken.findFirst({
            where: {
                token
            }
        });

        if(!userToken) {
            return undefined;
        }

        return userToken;
    }

    async generate(user_id: string): Promise<UserToken> {
        const userToken = await prismaClient.userToken.create({
            data: {
                user_id
            }
        });

        return userToken;
    }

}
