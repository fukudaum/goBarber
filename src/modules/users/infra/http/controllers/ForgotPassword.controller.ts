import { Request, Response } from "express";
import SendForgotPasswordEmailService from "modules/users/services/SendForgotPasswordEmail.service";
import { container } from 'tsyringe';

export default class ForgotPasswordController {
    public async forgot(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService);

        await sendForgotPasswordEmailService.execute({ email });

        return response.status(204).json();
    }
}
