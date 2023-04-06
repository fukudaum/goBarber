import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailability.service";
import { FakeAppointmentRepository } from "../repositories/fakes/FakeAppointment.repository";

let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('List Provider Month Availability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService();
    })

    it('should be able to list the month availability of provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2023, 3, 10, 8, 0, 0),
            user_id: 'user 2'
        })
    });

    // it('should not be able to list, because it doesnt have providers', async () => {

    //     await expect(listProviderMonthAvailabilityService.execute({
    //         user_id: '1345'
    //     })).rejects.toBeInstanceOf(AppError);

    // });
});
