# MPN Chat API

Este aplicativo consiste em disponibilizar apis para ilustrar um projeto de exemplo utilizando express e mongoose.
Para a versão 1 não foi abordado webSockets (socket.io), com o objetivo de simplificar o projeto para fins didáticos.

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/jfollmann/mpn-chat-api-sample/CI/master)
[![Coverage Status](https://coveralls.io/repos/github/jfollmann/mpn-chat-api-sample/badge.svg?branch=master&s=g)](https://coveralls.io/github/jfollmann/mpn-chat-api-sample?branch=master)
![CI](https://github.com/jfollmann/mpn-chat-api-sample/workflows/CI/badge.svg?branch=master)

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MPN%20Chat%20API%20Sample&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjfollmann%2Fmpn-chat-api-sample%2Fmaster%2FInsomniaWorkspace.json)
## Estrutura do projeto

```
~/mpn-chat-api
├── k8s                                   // Diretório com a stack do K8s
│   ├── deployment.yaml                   // K8s: Definição do deployment
│   ├── hpa.yaml                          // K8s: Definição do HPA
│   ├── pod.yaml                          // K8s: Definição de POD (descontinuado)
│   ├── secrets.yaml                      // K8s: Definição das Secrets
│   ├── service.yaml                      // K8s: Definição dos Services
│   └── test_stress.sh                    // Script SH de test de stress
├── src                                   // Diretório dos fontes do projeto
│   ├── application                       // Diretório principal da aplicação
│   │   └── App.ts                        // Definição da classe "Application"
│   ├── controllers                       // Diretório dos controllers do Projeto
│   │   ├── base                          // Diretório dos controllers Base do Projeto
│   │   │   └── BaseController.ts         // Controller Base do Projeto
│   │   ├── HelloController.ts            // Hello Controller
│   │   ├── MessageController.ts          // Message Controller
│   │   └── UserController.ts             // User Controller
│   ├── helpers                           // Diretório dos Helpers do projeto
│   │   └── Constants.ts                  // Arquivo de definição de constantes
│   ├── middlewares                       // Diretório de Middlewares
│   │   ├── LoggerMiddleware.ts           // Logger Middleware
│   │   └── validators                    // Diretório de middlewares de validação
│   │       ├── MessageValidator.ts       // Middleware de validação das messagens
│   │       └── UserValidator.ts          // Middleware de validação de usuário
│   ├── models                            // Diretório dos Modelos do Projeto (mongo)
│   │   ├── Database.ts                   // Definição da Classe de Conexão com o banco
│   │   ├── Message.ts                    // Definição do Modelo de Mensagem
│   │   └── User.ts                       // Definição do Modelo de Usuário
│   ├── routes                            // Diretório das Rotas do Projeto
│   │   ├── HelloRoutes.ts                // Hello Routes
│   │   ├── MessageRoutes.ts              // Message Routes
│   │   └── UserRoutes.ts                 // User Routes
│   └── Server.ts                         // Arquivo principal do projeto
├── test                                  // Diretório dos testes unitários do Projeto
│   ├── application                       // Diretório dos testes principais da aplicação
│   │   └── App.test.ts                   // Testes da classe App
│   ├── controllers                       // Diretório de testes dos Controllers
│   │   ├── base                          // Controller Base do Projeto
│   │   │   └── BaseController.test.ts    // Testes do Base Controller
│   │   ├── HelloController.test.ts       // Testes do Hello Controller
│   │   ├── MessageController.test.ts     // Testes do Message Controller
│   │   └── UserController.test.ts        // Testes do User Controller
│   ├── middlewares                       // Diretório dos Testes dos middlewares
│   │   ├── LoggerMiddleware.test.ts      // Testes do Logger Middleware
│   │   └── validators                    // Diretório dos Testes dos Validators
│   │       ├── MessageValidator.test.ts  // Testes do Message Validator
│   │       └── UserValidator.test.ts     // Testes do User Validator
│   ├── _mocks                            // Diretório dos Mocks dos Testes
│   │   └── HelperMocks.ts                // Definição do Helper de Mock dos Testes
│   ├── models                            // Diretório dos Testes dos Modelos
│   │   └── Database.test.ts              // Testes do Database
│   ├── routes                            // Diretório dos Testes das Rotas do Projeto
│   │   ├── HelloRoutes.test.ts           // Testes Hello Routes
│   │   ├── MessageRoutes.test.ts         // Testes Message Routes
│   │   └── UserRoutes.test.ts            // Testes User Routes
│   └── Server.test.ts                    // Testes do Server
├── docker-compose.yml                    // Arquivo de definição da stack do compose
├── Dockerfile                            // DockerFile
├── InsomniaWorkspace.json                // Arquivo Collection Insomnia Workspace (Sample Request's)
├── nodemon.json                          // Recarregar automáticamente fontes alterados
├── package.json                          // Configurações e dependências do projeto
├── package-lock.json                     // Versões instaladas de cada depedência do projeto
├── README.md                             // Leia-me (este arquivo)
├── tsconfig.json                         // Configurações TypeScript (GTS based)
├── jasmine.json                          // Configurações dos testes (Jasmine)
└── tslint.json                           // Configurações do TSLint
```

## Dependências do Projeto

  * **cors**: Habilita acesso a diferentes origens
  * **dotenv**: Loads env files
  * **express**: Web Framework
  * **http-status-codes**: Constantes com Códigos de Status HTTP
  * **mongoose**: Mapeamento objeto-relacional (mongo)

## Dependências de Desenvolvimento

  * **@types/cors**: Definições de tipo para cors
  * **@types/express**: Definições de tipo para express
  * **@types/mongoose**: Definições de tipo para mongoose
  * **@types/node**: Definições de tipo para node
  * **gts**: Estilo typescript do google
  * **nodemon**: Automação em recarregar fontes alterados
  * **ts-node**: Executa typescript diretamente
  * **typescript**: Linguagem que adiciona recursos ao Javascript

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

## Executando os testes

```bash
$ npm run test
```
ou
```bash
$ npm run test:coverage
```

Você poderá acessar a aplicação a partir do endereço [http://localhost:3333](http://localhost:3333)


Ainda com dúvidas em relação ao comandos do docker? [Tente consultar este material](https://gist.github.com/jfollmann/f409defd29e2de689963a2edae5172e8)
