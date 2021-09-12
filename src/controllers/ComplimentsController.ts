import { Request, Response } from "express";
import { CreateComplimentsServices } from "../services/CreateComplimentsServices";

//user snder já e autenticado, entao via pegar dentro do token
class ComplimentsController {
    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, user_sender, message } = request.body;
        const services = new CreateComplimentsServices();

        const elogio = await services.execute({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        return response.json(elogio);
    }

}

export { ComplimentsController }