import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }
    //validar se é authtoken valido
    // , ignora o primeiro index e armazena o segundo indice dentro da variavel token
    const [, token] = authtoken.split(" ");

    try {
        // user_id espera uma strnig, mas sub é function. Então força ele ser uma string com a interface e o as.
        const { sub } = verify(token, "secretKeyForValidateSignature") as IPayload;
        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}


