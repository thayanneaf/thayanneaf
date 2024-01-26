const kafkaNode = require("kafka-node");
const { Kafka } = require("kafkajs");

class KafkaNode {
  //Utilizando KafkaJS para producer, pois ele trata HEADERS e o kafka-node não
  async producer(topic, message, key, ip_broker) {
    const kafkajs = new Kafka({
      clientId: "qualidade-cypress",
      brokers: [ip_broker],
    });
    const producer = kafkajs.producer();
    await producer.connect();
    let mens = { value: message, key: key };
    await producer.send({
      topic: topic,
      messages: [mens],
    });
    await producer.disconnect();
    return "{ok}";
  }

  //Utilizando kafka-node para consumer, pois ele faz um trabalho melhor com o offset do que o KafkaJs
  async consumer(topicAux, offSetAux, partitionQty, ip_broker) {
    this.logHeader("Guardando CLIENT");
    let client = new kafkaNode.KafkaClient({ kafkaHost: ip_broker });
    
    let topics = [];
    for (let p = 0; p < partitionQty; p++) {
      topics.push({ topic: topicAux, partition: p });
    }

    this.logHeader("Atualizando array de topicos");
    console.log(topics);

    let options = {
      groupId: 'consumer-kafka-test',
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      fetchMaxBytes: 1024 * 1024,
      fetchMaxWaitMs: 100,
      fetchMinBytes: 1,
      fromOffset: 'none',
      encoding: "utf8",
      keyEncoding: 'utf8'
    };

    const mens = this.run_offset(
      client,
      topics, 
      options,
      offSetAux,
      partitionQty
    );
    return mens;
  }

  logHeader(message) {
    console.log(" ");
    console.log(`=== ${message} ===`);
    console.log(" ");
  }

  run_offset(client, topics, options, offSetAux, partitionQty) {
    let mens = [];
    let messages = new Promise((resolve, error) => {
      let offset = new kafkaNode.Offset(client);

      const topicAux = topics[0].topic;

      offset.fetchLatestOffsets([topicAux], async (err, offsets) => {
        let consumerK = new kafkaNode.Consumer(client, topics, options);
        
        // let consumerK = new kafkaNode.ConsumerGroup(options, topics);
        // console.log("Cheguei Aqui");
        // console.log(options, topicAux);

        consumerK.setMaxListeners(0);

        if (err) {
          console.log(`error fetching latest offsets ${err}`);
          return;
        }

        let latest = 1;
        let arLatest = [];

        this.logHeader("Partições - Qtde de Mensagens");
        for (let p = 0; p < partitionQty; p++) {
          console.log(`Partição [${p}]: ${offsets[topicAux][p] - 1}`);
          consumerK.setOffset(topicAux, p, offsets[topicAux][p] - offSetAux);
        }

        this.logHeader("Consumindo MENSAGENS");
        mens = await this.run_consumer(consumerK);
        process.on("SIGINT", function () {
          consumerK.close(true, function () {
            process.exit();
          });
        });

        resolve(mens);
        this.logHeader("FINALIZADO: " + mens.length);
      });
    });
    return messages;
  }

  run_consumer(consumerK) {
    let arMessages = [];
    let prom = new Promise((resolve, error) => {
      consumerK.on("message", function (message) {
        arMessages.push({
          message: message.value,
          offset: message.offset,
          partition: message.partition,
          key: message.key,
        });

        console.log(">>>>>> MENSAGEM: " + message.value);
        console.log("offset: " + message.offset);
        console.log("particao: " + message.partition);
        console.log("key: " + message.key);
        console.log("------------------------------");
        console.log(arMessages.length);

        resolve(arMessages);
      });

      console.log("Cheguei Aqui...");
      consumerK.removeTopics(['kafka-cypress'], function (err, removed) {
        console.log("Cheguei Aqui pra remover");
      });

      consumerK.on("error", function (err) {
        console.log("error", err);
        error(err);
      });
    });
    return prom;
  }

  getMessage = (messages, strValue) => {
    let res = {};
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].message.includes(strValue)) {
        res = JSON.parse(messages[i].message);
        break;
      }
    }
    return res;
  };
}

exports.KafkaNode = KafkaNode;
