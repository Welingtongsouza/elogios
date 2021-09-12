import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1631470147330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "varchar",
                    },
                    {
                        name: "user_receiver",
                        type: "varchar",
                    },
                    {
                        name: "tag_id",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varcgar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSender",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiver",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKtags",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        // liga a tabela tags, da coluna id com a coluna tag_id da tabela compliments
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]

            })

            // await queryRunner.createForeignKey() 
            //dá pra criar assim também as fk
            // porém quando for deletar algo da tabela, tem que dar drop aqui e na tabela. Da primeira maneira acima, ele ja derruba os dois.
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
