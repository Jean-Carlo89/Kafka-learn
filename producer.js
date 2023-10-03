const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer-test',
  brokers: ['kafka:9092'] 
});

const producer = kafka.producer();

const produzirMensagem = async (mensagem) => {
  await producer.send({
    topic: 'testante',
    messages: [
      { value: mensagem },
    ],
  });
};

const init = async () => {
let i = 0
  await producer.connect();
  console.log("Digite sua mensagem e pressione ENTER para enviar. Digite 'sair' para encerrar.");

  process.stdin.on('data', async (data) => {
    const mensagem = data.toString().trim();
    
    if (mensagem.toLowerCase() === 'sair') {
      await producer.disconnect();
      process.exit();
    } else {
      await produzirMensagem(mensagem + " " +i);
        i++
      console.log('Mensagem enviada!');
    }
  });
};

init().catch(console.error);
