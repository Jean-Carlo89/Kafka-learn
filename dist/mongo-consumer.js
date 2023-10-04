"use strict";
// const { Kafka } = require('kafkajs');
// const { MongoClient } = require('mongodb');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const mongodb_1 = require("mongodb");
const kafka = new kafkajs_1.Kafka({
    clientId: "mongo-cosumer-test",
    brokers: ["kafka:9092"], // because outside the docker container
});
const consumer = kafka.consumer({ groupId: "GY" });
const MONGODB_URI = "mongodb://mongodb:27017";
const DB_NAME = "Kafka-test";
const COLLECTION_NAME = "messages";
const consumirMensagens = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: "testante" });
    const client = new mongodb_1.MongoClient(MONGODB_URI);
    yield client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const value = (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString();
            console.log({ value });
            yield collection.insertOne({ message: value });
        }),
    });
});
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
