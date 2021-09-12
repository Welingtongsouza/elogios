import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserServices {
    async execute({ name, email, admin }: IUserRequest) {
        // por estar usando um repository customizado devemos instanciar dessa maneira no orm.
        // Se tivesse dado um new UserRepositories() ele não iria reconhecer
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Email missing.")
        }

        const userAlreadyExist = await usersRepository.findOne({ email })

        if (userAlreadyExist) {
            throw new Error("User already exists.")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserServices }