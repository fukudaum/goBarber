import User from "@modules/users/entities/User";
import AutheticateUserService from "@modules/users/services/AuthenticateUser.service";
import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreatedUser } from "../routes/users.route";

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        const authenticateUserService = container.resolve(AutheticateUserService);

        const { user, token } = await authenticateUserService.execute({ password, email });

        const transformedUser = transformUser(user);

        return response.json({ user: transformedUser, token });
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
