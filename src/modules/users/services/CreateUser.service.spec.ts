import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUser.service";

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const provider = await createUserService.execute({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        expect(provider).toHaveProperty('id');
    });

    it('should not be able to create a new user because email already registered', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        await expect(createUserService.execute({
            name: 'Provider Test 2',
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });
});
