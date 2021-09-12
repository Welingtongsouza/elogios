import { getCustomRepository, getRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRespositories"

class CreateTagService {
    async execute(name: string) {
        if (!name) {
            throw new Error("Invalid request")
        }

        const repository = getCustomRepository(TagsRepositories);

        const alreadyExistTag = await repository.findOne({
            name
        })

        if (alreadyExistTag) {
            throw new Error("Tag já existe")
        }

        const tag = repository.create({
            name
        })

        await repository.save(tag)

        return tag;
    }
}

export { CreateTagService }