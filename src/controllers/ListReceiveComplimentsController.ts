import { Request, Response } from "express";
import { ListReceiveComplimentsServices } from "../services/ListReceiveComplimentsServices";

class ListReceiveComplimentsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const service = new ListReceiveComplimentsServices();

        const compliments = await service.execute(user_id)

        return response.json(compliments)
    }
}

export { ListReceiveComplimentsController }