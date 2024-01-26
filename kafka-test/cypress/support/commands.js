//import { dateHelpers } from "../support/helpers/dateHelpers";
import 'cypress-wait-until';

Cypress.Commands.add("criarProducerKafka_JS", (topic, message, key, ip_broker) => {
  //const date_helpers = dateHelpers;
  //const messages = message + Cypress.env("dataNativa", date_helpers.getNowNative());
  var messages = JSON.stringify(message);

  cy.task("task_ProducerKafka_JS", [topic, messages, key, ip_broker]);
});

Cypress.Commands.add("criarConsumerKafka_Node", (partitionQty, topic, ip_broker, offset) => {
  
  cy.waitUntil(() => cy.task("task_ConsumerKafka_Node", [topic, offset, partitionQty, ip_broker]), {
    timeout: 30000, // tempo maximo
  });

});

