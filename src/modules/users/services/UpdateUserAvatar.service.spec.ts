import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import FakeStorageProvider from "../../../shared/container/provider/StorageProvider/fakes/FakeStorageProvider";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import UpdateUserAvatarService from "./UpdateUserAvatar.service";

describe('UpdateUserAvatar', () => {
    it('should be able to update an user avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            const updateUserAvatar = await updateUserAvatarService.execute({
                user_id: user?.id,
                avatarFileName: 'avatar.jpg',
            });

            if(updateUserAvatar)
                expect(updateUserAvatar.avatar).toBe('avatar.jpg');
        }

    });

    it('should not be able to update an user avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        expect(updateUserAvatarService.execute({
            user_id: '1',
            avatarFileName: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError);;

    });

    it('should delete avatar when a new one is updated', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            await updateUserAvatarService.execute({
                user_id: user?.id,
                avatarFileName: 'avatar.jpg',
            });

            const updateUserAvatar = await updateUserAvatarService.execute({
                user_id: user?.id,
                avatarFileName: 'avatar2.jpg',
            });

            expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

            if(updateUserAvatar)
                expect(updateUserAvatar.avatar).toBe('avatar2.jpg');
        }
    });

    it('should return undefined because avatarFileName was not informed', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            const updateUserAvatar = await updateUserAvatarService.execute({
                user_id: user?.id,
                avatarFileName: undefined,
            });

            if(updateUserAvatar)
                expect(updateUserAvatar).toBe(undefined);
        }

    });
});
