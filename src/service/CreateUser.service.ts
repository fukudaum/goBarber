import { startOfHour } from "date-fns";
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";

interface Request {
    name: string;
    password: string;
    email: string;
}

class CreateUserService {
    constructor(private usersRepository: UsersRepository) {}

    public async execute({ name, password, email }: Request): Promise<User | undefined> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(findUser) {
            throw Error('This email is already registered!');
        }

        const User = await this.usersRepository.create({  name, password, email });

        return User;
    }
}

export default CreateUserService;
