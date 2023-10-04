"use strict";
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
const kafka = new kafkajs_1.Kafka({
    clientId: "producer-test",
    brokers: ["kafka:9092"],
});
const producer = kafka.producer();
const produzirMensagem = (mensagem) => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.send({
        topic: "testante",
        messages: [{ value: mensagem }],
    });
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    yield producer.connect();
    console.log("Digite sua mensagem e pressione ENTER para enviar. Digite 'sair' para encerrar.");
    process.stdin.on("data", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const mensagem = data.toString().trim();
        if (mensagem.toLowerCase() === "sair") {
            yield producer.disconnect();
            process.exit();
        }
        else {
            yield produzirMensagem(mensagem + " " + i);
            i++;
            console.log("Mensagem enviada!");
        }
    }));
});
init().catch(console.error);
