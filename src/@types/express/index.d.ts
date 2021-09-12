declare namespace Express {
    export interface Request {
        user_id: string;
    }
}

// tras tudo do express + essas alterações acima.
// lembrar que toda vez que criar um @types modificado no projeto, tem que adicionar ele no tsconfig.json em typesroot e apontar pra pasta, senão ele não lê.