# MPN Chat API

Este aplicativo consiste em disponibilizar apis para ilustrar um projeto de exemplo utilizando express e mongoose.

## Estrutura do projeto

```
├── src                           // Fontes do projeto
│   ├── app.ts                    // Arquivo principal do projeto (index)
│   ├── controllers               // Controllers do Projeto
│   ├── middlewares               // Middlewares do Projeto
│   ├── models                    // Modelos (Mongo)
│   └── routes.ts                 // Definição das rotas da API
├── Dockerfile                    // DockerFile
├── .editorconfig                 // Definição guidelines do projeto
├── .gitignore                    // Definição de arquivos ignorados no GIT
├── nodemon.json                  // Recarregar automáticamente fontes alterados
├── package.json                  // Configurações e dependências do projeto
├── package-lock.json             // Versões instaladas de cada depedência do projeto
├── tsconfig.json                 // Configurações TypeScript (GTS based)
├── tslint.json                   // Configurações do TSLint
├── README.md                     // Leia-me (este arquivo)
├── docker-compose.yml            // Arquivo de definição da stack do compose
```

## Rodando a aplicação (docker-compose)

Para rodar a aplicação, basta executar o seguinte comando:

```bash
$ docker-compose up --build -d
```

Este comando irá:
  * criar uma imagem docker a partir do Dockerfile
  * criar um container chamado "mpn-chat-api"
  * mapear a porta 3333 do host para a mesma porta no container

Você poderá acessar a aplicação a partir do endereço [http://localhost:3333](http://localhost:3333)

## Rodando a aplicação (docker)

Criar a imagem docker a partir do seguinte comando:

```bash
$ docker build -t mpn-chat-api .
```

Uma imagem docker será criada com o nome "mpn-chat-api".

Para executar a imagem:

```bash
$ docker run --name mpn-chat-api -p 3333:3333 mpn-chat-api -d
```

Você poderá acessar a aplicação a partir do endereço [http://localhost:3333](http://localhost:3333)

## Rodando a aplicação (desenvolvimento)

Para rodar a aplicação em desenvolvimento, primeiro precisamos instalar as dependências:

```bash
$ npm i
```

Em seguida, executar:

```bash
$ npm run start:dev
```

Você poderá acessar a aplicação a partir do endereço [http://localhost:3333](http://localhost:3333)
