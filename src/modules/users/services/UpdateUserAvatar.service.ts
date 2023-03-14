import { UsersRepository } from "../repositories/users.repository";
import path from 'path';
import fs from 'fs';

import User from "@modules/users/entities/User";
import AppError from "@shared/errors/AppErrors";
import uploadConfig from "@config/upload";

interface Request {
    user_id: string;
    avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: UsersRepository) {}
    public async execute({ user_id, avatarFileName }: Request): Promise<User | undefined> {
        const user = await this.usersRepository.findUnique(user_id);
        if(!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        if(avatarFileName) {
            const updatedUser = await this.usersRepository.updateAvatar(avatarFileName, user_id);
            return updatedUser;
        }

        return undefined;
    }
}

export default UpdateUserAvatarService;
