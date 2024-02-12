# Estrutura do projeto -> Cypress + Kafka Node/Js

Estrutura do projeto:

```
│  ├── .gitHub/
│  ├── cypress/
│  │   	├── download/
│  │   	├── e2e/
│  │       ├── Kafka_Exemplo.cy.js/
│  │    ├── fixtures/
│  │       ├── Kafka_Exemplo.js/
│  │    └── support/
│  │       ├── helpers/
│  │       ├── Kafka/
├── img/
├── .gitignore
├── cypress.env.json
├── cypress.config.js
├── package.json
└── README.md
```

# Pré-Requisitos

- [NodeJS instalado (versão 14 ou superior)](https://nodejs.org/en/)
- [Tópico do Kafka já criado](https://kafka.apache.org/downloads)

- [Ter um servidor do Kafka rodando localmente]
- [Ter um Tópico com o nome Cypress]

# Bibliotecas Utilizadas

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress#Who-uses-Cypress)
- [kafka-node](https://www.npmjs.com/package/kafka-node)
- [kafkajs](https://kafka.js.org/docs/getting-started)

# Arquivos relacionados ao Kafka são
- Kafka_Exemplo.cy.js  Modelo de casos de teste
- Kafka_Config_MassaTeste.js  Arquivo de configuração Vide Tabela abaixo.
- Kafka.js Classe onde estão as chamdas Kafka.
- cypress.config.js Arquivo responsável para fazer as chamadas das funções contidas no Kafka.js

# Configurar os dados do Kafka_Config_MassaTeste.js

| Arquivo                | Descrição                                                               |
| ---------------------- | ----------------------------------------------------------------------- |
| partitionQuantidade: 1 | Informar o número exato ou menor de partições                           |
| topic:                 | Nome do tópico                                                          |
| message:               | Produtor -(Mesagem enviada)                                             |
| ip_broker:             | Informar endereço do broker                                             |
| key:                   | Texto caso nao seja nescessário utilizar keys pode comentar essa linha  | 

# Passos para executar o projeto

| Comando                | Descrição                                   |
| ---------------------- | ------------------------------------------- |
| npm i                  | Instala as dependências                     |
| npm run cy:open        | Abre o Cypress                              |
| npm run cy:test        | Executar os testes do Cypress               |
| npm run allure:report  | Gera o relatório do Allure                  |
| npm run cy:test:report | Executa os Testes e gera o Report do Allure |

# Passos para inicar o Docker

## Iniciar o Docker/Kafka
docker-compose up -d
## Criar Tópicos
docker exec -it kafka /bin/bash
kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic cypress
## Encerrar o Docker/Kafka
docker-compose down
