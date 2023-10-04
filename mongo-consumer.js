
const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');

const kafka = new Kafka({
  clientId: 'mongo-cosumer-test',
  brokers: ['kafka:9092']  // because outside the docker container
});

const consumer = kafka.consumer({ groupId: "GY" });

const MONGODB_URI = "mongodb://mongodb:27017";  
const DB_NAME = "Kafka-test"; 
const COLLECTION_NAME = "messages"; 

const consumirMensagens = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'testante', });

 
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log({ value });

     
      await collection.insertOne({ message: value });
    },
  });


};

consumirMensagens().catch(console.error);



// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'cosumer-test',
//   brokers: ['kafka:9094']  //* because outise the docker container
// })

// const consumer = kafka.consumer({groupId:"GX"})

// //const consumer = kafka.consumer({ groupId: 'meu-grupo' })

// const consumirMensagens = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'testante', fromBeginning: true })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         value: message.value.toString(),
//       })
//     },
//   })
// }

// consumirMensagens().catch(console.error)

// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'cosumer-test',
//   brokers: ['kafka:9092']  //* because outise the docker container
// })

// const consumer = kafka.consumer({groupId:"GX"})

// //const consumer = kafka.consumer({ groupId: 'meu-grupo' })

// const consumirMensagens = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'testante', fromBeginning: true })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         value: message.value.toString(),
//       })
//     },
//   })
// }

// consumirMensagens().catch(console.error)