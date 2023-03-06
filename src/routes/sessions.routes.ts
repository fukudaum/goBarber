import { Request, Response, Router } from "express";
import User from "../entities/User";
import { PrismaUserRepository } from "../repositories/prisma/prismaUsers.repository";
import AutheticateUserService from "../service/AuthenticateUser.service";
import { CreatedUser } from "./users.route";

const sessionsRouter = Router();
const usersRepository = new PrismaUserRepository()

sessionsRouter.post('/', async(request: Request, response: Response) => {
    try {
        const { password, email } = request.body;

        const authenticateUserService = new AutheticateUserService(usersRepository);

        const { user } = await authenticateUserService.execute({ password, email });

        const transformedUser = transformUser(user);

        return response.json({ user: transformedUser });
    } catch (error) {
        return response.status(404).json({ error });
    }
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
