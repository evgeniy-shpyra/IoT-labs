import initRedis from './redis/initRedis.js'
import connectMqt from './transport/mqtt.js'
import validator from './utils/validator.js'
import processedDataSchema from './schema/processedDataSchema.js'
import aggregatedDataSchema from './schema/aggregatedDataSchema.js'
import DB from './db/index.js'
import aggregateData from './utils/aggregateData.js'

const dbPassword = process.env.POSTGRES_PASSWORD || 'pass'
const dbUser = process.env.POSTGRES_USER || 'user'
const dbHost = process.env.POSTGRES_HOST || 'postgres_db'
const dbName = process.env.POSTGRES_DB || 'test_db'
const dbPort = process.env.POSTGRES_PORT || '5432'

const mqttBroker = process.env.MQTT_BROKER_HOST || 'mqtt'
const mqttPort = process.env.MQTT_BROKER_PORT || '1883'
const mqttTopic = process.env.MQTT_TOPIC || 'processed_data_topic'

const redisHost = process.env.REDIS_HOST || '127.0.0.1'
const redisPort = process.env.REDIS_PORT || 6379

const storeApiPort = process.env.STORE_API_PORT
const storeApiHost = process.env.STORE_API_HOST

const app = async () => {
  // db


  // const db = DB({ password: dbPassword, login: dbLogin, name: dbName })
  const db = DB({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    name: dbName,
    port: dbPort,
  })
  const repositories = await db.start()


  // create a connection to mqtt
  const mqttClient = await connectMqt({ broker: mqttBroker, port: mqttPort })
  await mqttClient.subscribe(mqttTopic)

  // redis
  const handlersRedis = await initRedis({ host: redisHost, port: redisPort })
  await handlersRedis.delete(mqttTopic)


  mqttClient.on('message', async (topic, message) => {
    try {
      const road_state = 'good'
      const data = JSON.parse(message.toString())
      const dataTopic = topic.toString()

      if (!validator(data, processedDataSchema)) {
        throw new Error("Hub: Input data isn't valid")
      }

      const aggregatedData = aggregateData({ ...data, road_state })
      if (!validator(aggregatedData, aggregatedDataSchema)) {
        throw new Error("Hub: Aggregated data data isn't valid")
      }

      if ((await handlersRedis.getLength(dataTopic)) >= 10) {
        const jsonData = await handlersRedis.pullAll(mqttTopic)
        const agentData = jsonData.map((item) => JSON.parse(item))
        // await repositories.agent.createBulk(agentData)
        fetch(``)
        await handlersRedis.delete(mqttTopic)
      }

      await handlersRedis.push(dataTopic, aggregatedData)
    } catch (err) {
      console.log("Hub:", err)
      process.exit(1)
    }
  })
}

app()
