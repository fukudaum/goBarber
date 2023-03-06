import { Request, Response, Router } from "express";
import User from "../entities/User";
import { PrismaUserRepository } from "../repositories/prisma/prismaUsers.repository";
import CreateUserService from "../service/CreateUser.service";

export interface CreatedUser {
    id: string | undefined
    name: string
    email: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
}

const usersRouter = Router();
const usersRepository = new PrismaUserRepository()

usersRouter.get('/', async(request: Request, response: Response) => {
    const Users = await usersRepository.find();

    return response.json(Users);
});

usersRouter.post('/', async(request: Request, response: Response) => {
    const {  name, password, email } = request.body;

    const createUserService = new CreateUserService(usersRepository);
    try {
        const user = await createUserService.execute({
            name,
            password,
            email
        });

        if(!user) {
            throw new Error('Error creating user');
        }

        const transformedUser = transformUser(user);
        return response.json(transformedUser);
    } catch (error) {
        return response.status(400).json({
            error
        });
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

export default usersRouter;
