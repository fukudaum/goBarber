import { Request, Response } from "express";
import ResetPasswordService from "modules/users/services/ResetPassword.service";
import { container } from 'tsyringe';

export default class ResetPasswordController {
    public async reset(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({ password, token });

        return response.status(204).json();
    }
}
