import { Request, Response } from "express";
import { CreateComplimentsServices } from "../services/CreateComplimentsServices";

class ComplimentsController {
    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, message } = request.body;
        const { user_id } = request;

        const services = new CreateComplimentsServices();

        const elogio = await services.execute({
            tag_id,
            user_receiver,
            user_sender: user_id,
            message
        })

        return response.json(elogio);
    }

}

export { ComplimentsController }