import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"

class ListSenderComplimentsServices {
    async execute(user_id: string) {
        const complimentsRepository = getCustomRepository(ComplimentsRepositories)

        const result = complimentsRepository.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })

        return result;
    }
}
export { ListSenderComplimentsServices }