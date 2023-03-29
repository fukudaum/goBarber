import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUser.service";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to create a new user', async () => {
        const provider = await createUserService.execute({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        expect(provider).toHaveProperty('id');
    });

    it('should not be able to create a new user because email already registered', async () => {
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
