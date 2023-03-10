import { UsersRepository } from "../repositories/users.repository";

interface Request {
    user_id: string;
    avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: UsersRepository) {}
    public async execute({ user_id, avatarFileName }: Request): Promise<void> {
        const user = await this.usersRepository.findUnique(user_id);

        if(!user) {
            throw new Error('Only authenticated users can change avatar');
        }

        if(user.avatar) {

        }
    }
}

export default UpdateUserAvatarService;
