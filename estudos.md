 # Estudos
 
 ## Node
    Event loop
    - Responsável por receber as requisições do client-side.
    - Imagine uma pilha. Cada requisição vai sendo recebida pelo event loop.
    - Ele é single thread. Entretanto, ele não tem funcionalidade de PROCESSAR nada, apenas delegar para as threads executarem. IMPORTANTE! node não é single thread, apenas o event loop. Node default é 4 threads, mas também depende da maquina. Isto é configuravel, caso haja necessidade.

    Node - Non-blocking IO (sincrono vs assincrono)
    - As operações de E / S sem bloqueio permitem que um único processo atenda a várias solicitações ao mesmo tempo. Em vez de o processo ser bloqueado e aguardar a conclusão das operações de E / S, as operações de E / S são delegadas ao sistema, para que o processo possa executar a próxima parte do código. As operações de E / S sem bloqueio fornecem uma função de retorno de chamada que é chamada quando a operação é concluída.
    - É opcional, existe maneiras de tornar sincrono, caso haja necessidade. Porém cria baixo desempenho na aplicação, já que I / O acessa o disco.

## TypeScript
    Node nativamente não interpreta typescript. Então existe maneiras de converter o typescript para javaScript, onde o V8 consegue interpretar.

    # Para iniciar um projeto com typescript
    - yarn tsc --init. Irá criar um tsconfig.json, onde você pode configurar do jeito que desejar.

    - Recomendável jogar o stric to false, para que não faça validações ao pé da letra.

    - Como node não interpreta arquivos.ts ou typscript, você precisa converter eles para .js com o comando yarn tsc. Todos os arquivos.ts, a engine irá criar os mesmo arquivos em .js

    #Automatizando a etapa anterior. 
    
    - Isso serve para evitar arquivos desnecessários no projeto e trabalho de corno. Já que typscript é apenas para ambiente de DESENVOLVIMENTO, não funciona em produção. O que roda em produção é javaScript transpilado do ts.
    Para automatizar basta instalar o ts-node-dev (yarn add ts-node-dev -D).
    Sempre usar o -D para type, já que usamos só para desenvolvimento.
    Importante adicionar no script no .json 
    "dev": "ts-node-dev src/server.ts"
    Nisso só chamar o yarn dev, e ele irá executar o servidor sem ficar transpilando o codigo no projeto, sujando o projeto com arquivos.js

    - A biblioteca ts-node-dev toda tem auto reload nas alterações, não precisa ficar matando o projeto e subindo.


# Curiosidade

    - Algumas bibliotecas em node tem o auto-complete do código separadamente. Por exemplo o express. Neste caso, é necessário instalar separadamente, por exemplo yarn add @types/express. Toda vez que tiver "3 pontinhos na importação" reclamando de algo, possivelmente é reclamando que está faltando a tipagem/autocomplete.

    yarn add @types/biblioteca e confira se resolveu o problema após instalação.

    - Importações onde existe o index, não precisa ser explicito na importação. Ex: import ".database". O node já sabe que é pra acessar o index.ts

# Banco de dados

    Existe 3 maneiras de usar banco de dados no node.

    # Com drive.
        - Neste caso, é o famoso "seco". Você dá um require na biblioteca e passa o sql para o banco e ele executa, baseado em sql puro.
    
    # Com bancos que facilitam com algumas 
    funções já prontas.
        - Neste caso, você cria o sql no codigo utilizando funções. Exemplo:
        Bd.select("user").from("client").Where("id = 1").Limit(1)

    # ORM
        - Aqui, você mapeia tudo e depois é feliz. Cria as entidades e migrations.


# ORM - Que foi utilizado neste projeto

    Faz a comunicação entre as entidades e o banco relacional. Basta você fazer todo o mapeamento e depois ser feliz sem precisar ficar criando as query na mão.

    - ORM trabalha com decorators, neste projeto foi utilizado o reflect-metadata.

    - Após instalar o typeorm e as decorators, é necessário criar o ormconfig.json e criar as configurações do projeto. O orm.json tem que estar na mesma estrutura do package.json

    # Configurando o ormconfig.json

        type = banco utilizado.
        database = aponta para a database no projeto.
        
        cli = É uma ferramente que é utilizado no terminal de forma global na aplicação para o orm 
        migrationsDir = caminho onde será criado as migrations
        entitiesDir = caminho das entidades da migrations

        migrations = caminho onde será lido as migrations
        entities = caminho onde será lido as entidades da migration

    # Configurando o CLI do typeorm no package.json

        Apenas adicionar no scripts:
        "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"        

 # Migration - "Controle de versionamento de banco"
        Você consegue sempre ter o mesmo banco compartilhado atualizado. Basta dar um update no fonte do projeto e sempre que executar, ele vai verificar se houve alguma interação de outro dev ou algo do tipo e o banco vai estar sempre atualizado.
        As maneiras mais antigas, é criar um arquivo no projeto e sempre ficar colocando lá as alterações que foram feitos no banco e rodar o comando diretamente pelo banco.
        Com migrations você cria a estrutura e sempre que rodar as migrations, ele verifica se existe novas atualizações, caso tenha, ele cria automaticamente. Sempre contendo os historicos.

        # Criando uma migrations
            yarn typeorm migration:create -n Nome

            Quando for criado a migration onde você setou no config, repare que irá no formato de timestamp-nome. Isso serve para a migration saber em que ordem deve executar.

        # Rodar Migrations 
            yarn typeorm migrations:run => vai executar as migrations e criar as coisas novas se necessario. Chamar a função up dentro da migrations.

        # Deletar uma migrations
            yarn typeorm migrations:revert => vai executar as migrations e criar as coisas novas se necessario. Chamar a função down dentro da migrations.

        # Criar uma entidade
            yarn typeorm entity:create -n nome => vai criar as entidades para migrations










    
    
    


