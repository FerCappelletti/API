
import nats from "node-nats-streaming"

class NatsConnector {

  constructor() {
    const { randomBytes } = require("crypto")

     nats.connect('api', 'login_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
  })
}
}
export default NatsConnector