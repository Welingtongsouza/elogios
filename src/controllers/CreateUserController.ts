import { CreateUserServices } from "../services/CreateUserServices";
import { Request, Response } from "express";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, admin } = request.body;

        const service = new CreateUserServices();

        const user = await service.execute({ name, email, admin });

        return response.json(user);
    }
}

export { CreateUserController }