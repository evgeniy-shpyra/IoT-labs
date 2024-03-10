import connectMqt from './transport/mqtt.js'
import redis from 'redis'

const app = async () => {
  // create a connection to mqtt
  const mqttBroker = process.env.MQTT_BROKER_HOST || 'mqtt'
  const mqttPort = process.env.MQTT_BROKER_PORT || '1883'
  const mqttTopic = process.env.MQTT_TOPIC || 'processed_data_topic'

  const mqttClient = await connectMqt({ broker: mqttBroker, port: mqttPort })
  await mqttClient.subscribe(mqttTopic)

  // redis
  const redisClient = redis.createClient({socket: {}})
  redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err)
    process.exit(1)
  })
  await redisClient.connect()

  mqttClient.on('message', async (topic, message) => {
    try {
      //console.log(JSON.parse(message));
      console.log(topic.toString(), message.toString())
    } catch (err) {
      console.log(err)
    }
  })
}

app()
