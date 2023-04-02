import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import ListProvidersService from "./ListProviders.service";

let fakeUsersRepository: FakeUsersRepository;

let listProvidersService: ListProvidersService;

describe('Show Profile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProvidersService = new ListProvidersService(fakeUsersRepository);
    })

    it('should be able to List all providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Teste 2',
            email: 'teste2@gmail.com',
            password: '1234'
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Teste 3',
            email: 'teste2@gmail.com',
            password: '1234'
        });

        if(loggedUser?.id) {
            const providers = await listProvidersService.execute({
                user_id: loggedUser?.id
            });

            expect(providers).toEqual([user1, user2]);
        }
    });

    it('should not be able to list, because it doesnt have providers', async () => {

        await expect(listProvidersService.execute({
            user_id: '1345'
        })).rejects.toBeInstanceOf(AppError);

    });
});
