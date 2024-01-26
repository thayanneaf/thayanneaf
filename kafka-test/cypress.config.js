const { defineConfig } = require("cypress");
const { KafkaNode } = require("./cypress/support/kafka/kafka");


module.exports = defineConfig({
  viewportWidth: 1140,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  projectId: '',
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        task_ProducerKafka_JS(args) {
          const kafka_JS = new KafkaNode();
          return kafka_JS.producer(args[0], args[1], args[2], args[3]);
        },
        task_ConsumerKafka_Node(args) {
          const kafka_Node = new KafkaNode();
          const res = kafka_Node.consumer(args[0], args[1], args[2], args[3]);
          return res;
        }
      });
      return config;
    },
  },
});
