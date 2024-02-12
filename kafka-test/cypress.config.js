const { defineConfig } = require("cypress");
const { KafkaNode } = require("./cypress/support/kafka/kafka");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cypress = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 60000,
  projectId: '',
  retries: 1,
  e2e: {
    env: {},
    pecPattern: 'cypress/e2e/*/.{cy,js,jsx,ts,tsx}',
    experimentalRunAllSpecs:  true,
    setupNodeEvents: async (on, config) => {
      allureWriter(on, config);

      //implement node event listeners here
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

      var environment = 'qa';
      let envConfig = await import(`./cypress/config/${environment}.js`);
      config.baseUrl = envConfig.default.baseUrl;
      config.viewportWidth = envConfig.default.viewportWidth;
      config.viewportHeight = envConfig.default.viewportHeight;

      config.env = {
        ...config.env,
        hideXhr: true,
        ...envConfig.default,
        allure: true,
        allureResultsPath: `./cypress/support/reports/allure/allure-results`
      };
      
      return config;
    },
  },
});
