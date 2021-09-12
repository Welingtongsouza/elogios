import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string
}

class CreateUserServices {
    async execute({ name, email, admin = false, password }: IUserRequest) {
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

        // senha e tamanho da criptografia
        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserServices }