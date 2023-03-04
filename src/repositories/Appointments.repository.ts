import Appointment from "../entities/Appointment";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";


class AppointmentsRepository extends Repository<Appointment>{
}

export default AppointmentsRepository;
