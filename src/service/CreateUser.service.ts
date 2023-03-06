import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";
import { hash } from "bcryptjs";

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

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({  name, password: hashedPassword, email });

        return user;
    }
}

export default CreateUserService;
