import { hash } from "bcryptjs";
import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import AutheticateUserService from "./AuthenticateUser.service";
import CreateUserService from "./CreateUser.service";

describe('CreateUser', () => {
    it('should be able to authenticate a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const autheticateUserService = new AutheticateUserService(fakeUsersRepository);
        const createUserService = new CreateUserService(fakeUsersRepository);

        const user = await createUserService.execute({
            name: 'Provider Test',
            password: 'teste',
            email: 'provider_teste@gmail.com'
        });

        if(user?.email) {
            const response = await autheticateUserService.execute({
                email: 'provider_teste@gmail.com',
                password: 'teste'
            });

            expect(response).toHaveProperty('token');
        }

    });

    it('should not be able to aunthenticate because email/password incorrect', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const autheticateUserService = new AutheticateUserService(fakeUsersRepository);

        expect(autheticateUserService.execute({
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to aunthenticate because password incorrect', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const autheticateUserService = new AutheticateUserService(fakeUsersRepository);
        const createUserService = new CreateUserService(fakeUsersRepository);

        await createUserService.execute({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        expect(autheticateUserService.execute({
            password: '1231232',
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });
});
