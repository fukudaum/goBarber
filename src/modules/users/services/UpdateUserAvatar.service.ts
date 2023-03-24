import { UsersRepository } from "../repositories/users.repository";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import AppError from "../../../shared/errors/AppErrors";
import IStorageProvider from "../../../shared/container/provider/StorageProvider/model/IStorageProvider";

interface Request {
    user_id: string;
    avatarFileName: string | undefined;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User | undefined> {
        const user = await this.usersRepository.findUnique(user_id);
        if(!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if(user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }


        if(avatarFileName) {
            const fileName = await this.storageProvider.saveFile(avatarFileName);

            const updatedUser = await this.usersRepository.updateAvatar(fileName, user_id);
            return updatedUser;
        }

        return undefined;
    }
}

export default UpdateUserAvatarService;
