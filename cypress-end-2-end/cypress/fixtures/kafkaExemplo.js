export const exemplo = {
  partitionQty: 1, //INFORMAR O NÚMERO EXATO OU MENOR DE PARTICOES DO TÓPICO
  topic: "cypress",
  message: "Teste Automatizado do Cypress com o Kafka",
  ip_broker: "localhost:9092",
  key: Math.round(Math.random(5) * 9).toString(),
};