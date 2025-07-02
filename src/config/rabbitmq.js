const amqp = require('amqplib');

let channel;
const queue = 'orders';
const exchange='orders_exchange';
const routingKey = 'send_orders'

async function connect() {
  if (channel) {
    // Already connected and channel created
    return;
  }
  // console.log(channel);
  const conn = await amqp.connect(process.env.RABBITMQ_URL,{clientProperties: { connection_name: 'my-app' }});
  // console.log(conn);
// await console.log(process.env.RABBITMQ_URL);
  // console.log("connected");
  channel = await conn.createChannel();
  await channel.assertExchange(exchange,"direct",{durable:false})
  await channel.assertQueue('orders',{ durable: true });
  await channel.bindQueue('orders',exchange,routingKey)
}



async function sendToQueue( msg) {
  // console.log(msg);
  await channel.publish(exchange,routingKey, Buffer.from(JSON.stringify(msg)));
}



async function getFromQueue(queueName) {
  if (!channel) {
    throw new Error('Channel is not initialized. Call connect() first.');
  }

  await channel.consume(queueName, (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content);
      console.log(`Received message from queue "${queueName}":`, message);
      channel.ack(msg);
    }
  });

  console.log(`Listening for messages on queue "${queueName}"...`);
}


function getChannel() {
  return channel;
}






module.exports = { connect, sendToQueue, getFromQueue, getChannel };
