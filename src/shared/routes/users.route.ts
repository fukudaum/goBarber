import { Request, Response, Router } from "express";
import User from "../../modules/users/entities/User";
import { PrismaUserRepository } from "../../modules/users/repositories/prisma/prismaUsers.repository";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import multer from 'multer';
import uploadConfig from '../../config/upload';
import CreateUserService from "../../modules/users/services/CreateUser.service";
import UpdateUserAvatarService from "../../modules/users/services/UpdateUserAvatar.service";

export interface CreatedUser {
    id: string | undefined
    name: string
    email: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
}

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersRepository = new PrismaUserRepository()

usersRouter.get('/', async(request: Request, response: Response) => {
    const Users = await usersRepository.find();

    return response.json(Users);
});

usersRouter.post('/', async(request: Request, response: Response) => {
    const {  name, password, email } = request.body;

    const createUserService = new CreateUserService(usersRepository);

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
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request: Request, response: Response) => {
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    if(request.user?.id)  {
        const user = await updateUserAvatar.execute({
            user_id: request.user?.id,
            avatarFileName: request.file?.filename,
        });

        return response.json(user);
    }
})

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
