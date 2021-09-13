import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "./database"
// express não trata errors async. Precisa dessa  biblioteca ou a requisição fica presa
import "express-async-errors" // declarar antes do router.
import { router } from "./router";


// @types/biblioteca
const app = express();
app.use(express.json()) // tipo de dados que o servidor vai trabalhar

// app.use(cors()) aceitar request do front-end, tem q instalar yarn add cors yarn add @types
// middleware use
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => {
    console.log("Server on pai")
})


/**
 * tipos de param
 *
 * routes param = link/produtos/4564654 => ex no express endpoint/teste/{id}
 * query param = geralmente usado para filtro link/produtos?name=teclado&variavel=variavel&variavel=variavel ..
 *
 * body param => um json
 *
 */

/**
 * GET => BUSCAR UMA INFORMAÇÃO
 * PUT => CRIAR ALGUMA INFORMAÇÃO
 * PUT => ALTERAR ALGUMA INFORMAÇÃO
 * DELETE => REMOVER ALGUMA INFORMAÇÃO
 * PATCH => ALTER ALGUMA INFORMAÇÃO ESPECIFICA, INVÉS DO DADO TODO. EX: ALTERAR SOMENTE O ENDEREÇO, INVÉS DO CLIENTE TODO
 */