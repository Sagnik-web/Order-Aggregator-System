const amqp = require('amqplib')
require('dotenv').config()
async function recvOrders(){
  try{
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()

    await channel.assertQueue('orders',{durable:true})
    await console.log("Order Listing .... ",process.env.RABBITMQ_URL);
    channel.consume('orders',(msg)=>{
      // console.log(msg);
      if(msg != null){
        console.log("Recv message ",JSON.parse(msg.content));
        channel.ack(msg)
      }
    })
  }catch(err){
    console.log(err);
  }
}

recvOrders()