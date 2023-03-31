import { Request, Response } from "express";
import User from "modules/users/entities/User";
import ShowProfileService from "modules/users/services/ShowProfile.service";
import UpdateProfileService from "modules/users/services/UpdateProfile.service";
import { container } from 'tsyringe';
import { CreatedUser } from "../routes/users.route";

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        if(!request.user?.id)  {
            throw new Error('User not found!');
        }

        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const userProfile = await showProfile.execute({ user_id });

        return response.json(userProfile);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {  name, password, old_password, email } = request.body;

        if(!request.user?.id)  {
            throw new Error('User not found!');
        }

        const user_id = request.user.id;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            password,
            old_password,
            email
        });

        if(!user) {
            throw new Error('Error creating user');
        }

        const transformedUser = transformUser(user);

        return response.json(transformedUser);
    }
}

function transformUser(user: User): CreatedUser {
    return {
        name: user.name,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
