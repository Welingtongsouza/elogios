import { Request, Response } from "express";
import { ListSenderComplimentsServices } from "../services/ListSenderComplimentsServices";

class ListSenderComplimentsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const service = new ListSenderComplimentsServices();

        const compliments = await service.execute(user_id)

        return response.json(compliments)
    }
}

export { ListSenderComplimentsController }