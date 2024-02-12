import * as all from "../fixtures/kafkaExemplo";

context("Exemplo de teste com kafka producer e consumer", () => {

  const topic = all.exemplo.topic;
  const message = all.exemplo.message;
  const key = all.exemplo.key;
  const ip_broker = all.exemplo.ip_broker;
  const partitionQty = all.exemplo.partitionQty;

  const kafkaMenssages = "cypress/downloads/message/kafkaExemplo.json";
 
  it("Teste de exemplo de um PRODUCER kafka", () => {
    cy.criarProducerKafka_JS(topic, message, key, ip_broker);
  });

  it("Teste de exemplo de um CONSUMER kafka", () => {
    const offset = 1;

    cy.criarConsumerKafka_Node(partitionQty, topic, ip_broker, offset).then((response) => {
      cy.writeFile(kafkaMenssages, response)
      const msg = (response[0].message).replace(/"/g, '')
      expect(msg).to.equal("Teste Automatizado do Cypress com o Kafka")
    })
  });

});