
import nats from "node-nats-streaming"
import User from '../models.ts/user'

class NatsConnector {

  constructor() {
    const { randomBytes } = require("crypto")

    const stan = nats.connect('api', 'auth_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
  })
  stan.on('connect', async () => {

    stan.subscribe('user:add').on('message', (msg) => {
      const data = JSON.parse(msg.getData())
      new User({email: data.email, password: data.password}).save();
    })

  });
}
}
export default NatsConnector


/**
 * require('dotenv').config()
const nats = require('node-nats-streaming')
const Product = require("../models/product")



class NatsConnector {

  constructor() {
    const { createHmac, randomBytes } = require("crypto")

    this.stan = nats.connect('api', 'home_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    }, (err, guid) => {
        if(err) console.log(err)
        else console.log(guid)
    });

    this.stan.on('connect', async () => {

      this.stan.subscribe('product:add').on('message', (msg) => {
        const data = JSON.parse(msg.getData())
        new Product({id: data.id, user_id: data.user_id, title:data.title, price:data.price, stock:data.stock }).save();
      })

      this.stan.subscribe('product:stock').on('message', async (msg) => {
        const data = JSON.parse(msg.getData())
        const filter = { id: data.id };
        const update = { stock: data.stock };
        await Product.findOneAndUpdate(filter, update);
      }) 

    });

  }
}

module.exports = new NatsConnector();

 * 
 */