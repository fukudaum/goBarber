import { Request, Response } from "express";
import UpdateUserAvatarService from "modules/users/services/UpdateUserAvatar.service";
import { container } from 'tsyringe';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        if(!request.user?.id)  {
            throw new Error('User not found!');
        }

        const user = await updateUserAvatar.execute({
            user_id: request.user?.id,
            avatarFileName: request.file?.filename,
        });

        return response.json(user);
    }
}
