import { Request, Response, Router } from "express";
import User from "@modules/users/entities/User";
import { PrismaUserRepository } from "@modules/users/repositories/prisma/prismaUsers.repository";
import AutheticateUserService from "@modules/users/services/AuthenticateUser.service";
import { CreatedUser } from "./users.route";

const sessionsRouter = Router();
const usersRepository = new PrismaUserRepository()

sessionsRouter.post('/', async(request: Request, response: Response) => {
    const { password, email } = request.body;

    const authenticateUserService = new AutheticateUserService(usersRepository);

    const { user, token } = await authenticateUserService.execute({ password, email });

    const transformedUser = transformUser(user);

    return response.json({ user: transformedUser, token });
});

function transformUser(user: User): CreatedUser {
    return {
        name: user.name,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

export default sessionsRouter;
