import "reflect-metadata";
import FakeMailProvider from "../../../shared/container/provider/MailProvider/fakes/FakeMailProvider";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserToken.repository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmail.service";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Teste',
            email: 'provider_teste@gmail.com',
            password: '123456'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'provider_teste@gmail.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await expect(sendForgotPasswordEmailService.execute({
            email: 'provider_teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgotten password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'provider_teste@gmail.com',
            password: '123456'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'provider_teste@gmail.com'
        });

        if(user) {
            expect(generateToken).toHaveBeenCalledWith(user.id);
        }
    })
});
