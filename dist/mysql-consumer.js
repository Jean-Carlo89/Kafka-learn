"use strict";
// const { Kafka } = require('kafkajs');
// const mysql = require('mysql2/promise');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const promise_1 = __importDefault(require("mysql2/promise"));
const kafka = new kafkajs_1.Kafka({
    clientId: "mysql-consumer-test",
    brokers: ["kafka:9092"], // because outside the docker container
});
const consumer = kafka.consumer({ groupId: "GX" });
const MYSQL_CONFIG = {
    host: "mysql",
    user: "test",
    password: "password",
    database: "kafka",
    port: 3306,
};
const consumirMensagens = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: "testante" });
    // Create a MySQL connection pool (this will handle multiple simultaneous database queries)
    const pool = promise_1.default.createPool(MYSQL_CONFIG);
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const value = (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString();
            console.log({ value });
            // Insert the consumed message into the MySQL database
            yield pool.execute("INSERT INTO messages (message) VALUES (?)", [value]);
        }),
    });
});
consumirMensagens().catch(console.error);
