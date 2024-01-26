export const exemplo = {
  partitionQty: 1, //INFORMAR O NÚMERO EXATO OU MENOR DE PARTICOES DO TÓPICO
  topic: "cypress",
  message: "Mensagem de exemplo",
  ip_broker: "localhost:9092",
  key: Math.round(Math.random(5) * 9).toString(),
};