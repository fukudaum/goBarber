import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AutheticateUserService from "./AuthenticateUser.service";
import CreateUserService from "./CreateUser.service";

describe('CreateUser', () => {
    const env = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = {
            SECRET: "ddb6b498f7f37dbf13d327dea0d733be",
            EXPIRESIN: "1d"
        }
    })

    afterAll(() => {
        process.env = env
    })

    it('should be able to authenticate a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUserService = new AutheticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUserService.execute({
            name: 'Provider Test',
            password: '1234',
            email: 'provider_teste@gmail.com'
        });

        if(user?.email) {
            const response = await autheticateUserService.execute({
                email: 'provider_teste@gmail.com',
                password: '1234'
            });

            expect(response).toHaveProperty('token');
        }

    });

    it('should not be able to aunthenticate because email/password incorrect', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUserService = new AutheticateUserService(fakeUsersRepository, fakeHashProvider);

        await expect(autheticateUserService.execute({
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to aunthenticate because password incorrect', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUserService = new AutheticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUserService.execute({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        await expect(autheticateUserService.execute({
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to aunthenticate because secret wasnt defined', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUserService = new AutheticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUserService.execute({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        await expect(autheticateUserService.execute({
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });
});
