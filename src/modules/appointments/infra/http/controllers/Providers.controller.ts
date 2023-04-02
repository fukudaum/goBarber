import { Request, Response } from "express";
import ListProvidersService from "modules/appointments/services/ListProviders.service";
import { container } from 'tsyringe';

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        let user_id = request.user.id;

        const listProvidersService = container.resolve(ListProvidersService);


        const providers = await listProvidersService.execute({
            user_id
        });

        return response.json(providers);
    }
}
