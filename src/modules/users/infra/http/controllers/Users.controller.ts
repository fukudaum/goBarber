import { Request, Response } from "express";
import { CreatedUser } from "../routes/users.route";
import { container } from 'tsyringe';
import User from "modules/users/entities/User";
import CreateUserService from "modules/users/services/CreateUser.service";

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {  name, password, email } = request.body;

        const createUserService = container.resolve(CreateUserService);

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
