import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfile.service";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to update profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            const updatedUser = await updateProfileService.execute({
                user_id: user?.id,
                name: 'Teste 2',
                email: 'teste2@gmail.com'
            });


            expect(updatedUser?.name).toBe('Teste 2');
            expect(updatedUser?.email).toBe('teste2@gmail.com');
        }
    });

    it('should not be able to change to an already existing email', async () => {
        await fakeUsersRepository.create({
            name: 'Teste 2',
            email: 'teste2@gmail.com',
            password: '1234'
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            await expect(updateProfileService.execute({
                user_id: user?.id,
                name: 'Teste 2',
                email: 'teste2@gmail.com'
            })).rejects.toBeInstanceOf(AppError);
        }
    });

    it('should be able to update password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            const updatedUser = await updateProfileService.execute({
                user_id: user?.id,
                name: 'Teste 2',
                email: 'teste2@gmail.com',
                password: '12345',
                old_password: '1234'
            });


            expect(updatedUser?.name).toBe('Teste 2');
            expect(updatedUser?.email).toBe('teste2@gmail.com');
            expect(updatedUser?.password).toBe('12345');
        }
    });

    it('should not be able to update password if old password doesnt match', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            await expect(updateProfileService.execute({
                user_id: user?.id,
                name: 'Teste 2',
                email: 'teste2@gmail.com',
                password: '12345',
                old_password: '123456'
            })).rejects.toBeInstanceOf(AppError);
        }
    });

    it('should not be able to update password if old password wasnt informed', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            await expect(updateProfileService.execute({
                user_id: user?.id,
                name: 'Teste 2',
                email: 'teste2@gmail.com',
                password: '12345',
            })).rejects.toBeInstanceOf(AppError);
        }
    });

    it('should not be able to update profile if user doesnt exist', async () => {

        await expect(updateProfileService.execute({
            user_id: '1231',
            name: 'Teste 2',
            email: 'teste2@gmail.com',
            password: '12345',
        })).rejects.toBeInstanceOf(AppError);

    });
});
