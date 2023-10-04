const { Kafka } = require('kafkajs');
const mysql = require('mysql2/promise');

const kafka = new Kafka({
  clientId: 'mysql-consumer-test',
  brokers: ['kafka:9092']  // because outside the docker container
});

const consumer = kafka.consumer({ groupId: "GX", });

const MYSQL_CONFIG = {
  host: 'mysql',  // replace with your MySQL host
  user: 'test',       // replace with your MySQL username
  password: 'password',       // replace with your MySQL password
  database: 'kafka', // replace with your MySQL database name
  port:3306
};

const consumirMensagens = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'testante',  });
  // Create a MySQL connection pool (this will handle multiple simultaneous database queries)
  const pool = mysql.createPool(MYSQL_CONFIG);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log({ value });

      // Insert the consumed message into the MySQL database
      await pool.execute("INSERT INTO messages (message) VALUES (?)", [value]);
    },
  });
};

consumirMensagens().catch(console.error);
