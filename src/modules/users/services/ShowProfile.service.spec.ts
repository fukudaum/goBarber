import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import ShowProfileService from "./ShowProfile.service";

let fakeUsersRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('Show Profile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);
    })

    it('should be able to show profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '1234'
        });

        if(user?.id){
            const userProfile = await showProfileService.execute({
                user_id: user?.id
            });


            expect(userProfile).toHaveProperty('id');
        }
    });

    it('should not be able to show profile if user doesnt exist', async () => {

        await expect(showProfileService.execute({
            user_id: '1345'
        })).rejects.toBeInstanceOf(AppError);

    });
});
