import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserToken.repository";
import ResetPasswordService from "./ResetPassword.service";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider,
        );
    });

    it('should be able to recover the password using the email', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'provider_teste@gmail.com',
            password: '123456'
        });

        if(user?.id) {
            const { token } = await fakeUserTokenRepository.generate(user.id);

            const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

            await resetPasswordService.execute({
                password: '123',
                token
            });

            const updatedUser = await fakeUsersRepository.findByEmail(user.email);

            if(updatedUser) {
                expect(generateHash).toHaveBeenCalledWith('123');
                expect(updatedUser.password).toBe('123');
            }
        }
    });

    it('should not be able to reset password because of invalid token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'teste',
                password: '123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password because of user not found', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'provider_teste@gmail.com',
            password: '123456'
        });

        if(user?.id) {
            const { token } = await fakeUserTokenRepository.generate(user.id);

            const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

            await fakeUsersRepository.delete(user.id);

            await expect(
                resetPasswordService.execute({
                    token,
                    password: '123',
                })
            ).rejects.toBeInstanceOf(AppError);
        }

    });

    it('should not be able to reset password if passed more than two hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'provider_teste@gmail.com',
            password: '123456'
        });

        if(user?.id) {
            const { token } = await fakeUserTokenRepository.generate(user.id);

            jest.spyOn(Date, 'now').mockImplementationOnce(() => {
                const customDate = new Date();

                return customDate.setHours(customDate.getHours() + 3);
            })

            await expect(
                resetPasswordService.execute({
                    token,
                    password: '123',
                })
            ).rejects.toBeInstanceOf(AppError);
        }
    });
});
