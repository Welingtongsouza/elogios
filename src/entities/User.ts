import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users") // nome da tabela
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //se vier preenchido é existente, caso contrario é um novo
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User }
