import { Request, Response, Router } from "express";
import UsersController from "../controllers/Users.controller";
import UserAvatarController from "../controllers/UserAvatar.controller";
import { PrismaUserRepository } from "modules/users/repositories/prisma/prismaUsers.repository";
import ensureAuthenticated from "shared/infra/http/middleware/ensureAuthenticated";

export interface CreatedUser {
    id: string | undefined
    name: string
    email: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
}

const usersRouter = Router();

const usersRepository = new PrismaUserRepository();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', async(request: Request, response: Response) => {
    const Users = await usersRepository.find();

    return response.json(Users);
});

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, userAvatarController.update);

export default usersRouter;
