import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface ICreateComplimentsServices {
    tag_id: string,
    user_receiver: string,
    user_sender: string,
    message: string
}

class CreateComplimentsServices {
    async execute({ tag_id, user_receiver, user_sender, message }: ICreateComplimentsServices) {
        const usersRepository = getCustomRepository(UsersRepositories);
        const complimentRepository = getCustomRepository(ComplimentsRepositories);

        if (user_sender === user_receiver) {
            throw new Error("You can't assign ​​to yourself")
        }

        const existUser = await usersRepository.findOne(user_receiver)

        console.log(existUser)
        if (!existUser) {
            throw new Error("User receiver doesnt exists")
        }

        const elogio = complimentRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentRepository.save(elogio);

        return elogio;
    }
}

export { CreateComplimentsServices }