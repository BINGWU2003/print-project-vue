import mqtt from "mqtt"
export default function mqttConnect() {
  
  const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt')
  // 订阅主题
  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    this.client.subscribe('test/topic', (err) => {
      if (!err) {
        console.log('Subscribed to topic')
      }
    })
  })

  // 接收消息
  client.on('message', (topic, message) => {
    this.receivedMessage = message.toString()
    console.log(`Received message: ${this.receivedMessage}`)
  })

  return client
}