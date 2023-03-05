import { Request, Response, Router } from "express";
import { PrismaUserRepository } from "../repositories/prisma/prismaUsers.repository";
import CreateUserService from "../service/CreateUser.service";

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
        const User = await createUserService.execute({
            name,
            password,
            email
        });

        return response.json(User);
    } catch (error) {
        return response.status(400).json({
            error
        });
    }
});

export default usersRouter;
