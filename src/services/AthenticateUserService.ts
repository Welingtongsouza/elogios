import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserService {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateUserService) {
        const repository = getCustomRepository(UsersRepositories)

        const user = await repository.findOne({
            email
        })

        if (!user) {
            throw new Error("Email/Password invalid")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password invalid")
        }

        //Gerar token
        const token = sign({
            email: user.email
        }, "secretKeyForValidateSignature", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }
}

export { AuthenticateUserService }