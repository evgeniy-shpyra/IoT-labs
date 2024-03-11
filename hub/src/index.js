import initRedis from './redis/initRedis.js'
import connectMqt from './transport/mqtt.js'
import validator from './utils/validator.js'
import processedDataSchema from './schema/processedDataSchema.js'
import aggregatedDataSchema from './schema/aggregatedDataSchema.js'
import aggregateData from './utils/aggregateData.js'
import storeApi from './api/store.js'

const mqttBroker = process.env.MQTT_BROKER_HOST || 'mqtt'
const mqttPort = process.env.MQTT_BROKER_PORT || '1883'
const mqttTopic = process.env.MQTT_TOPIC || 'processed_data_topic'

const redisHost = process.env.REDIS_HOST || '127.0.0.1'
const redisPort = process.env.REDIS_PORT || 6379

const storeApiPort = process.env.STORE_API_PORT || 8000
const storeApiHost = process.env.STORE_API_HOST || "store"
const storeApiUrl = `http://${storeApiHost}:${storeApiPort}/processed_agent_data`
// const storeApiUrl = `http://0.0.0.0:${storeApiPort}/processed_agent_data`

const app = async () => {
  // create a connection to mqtt
  const mqttClient = await connectMqt({ broker: mqttBroker, port: mqttPort })
  await mqttClient.subscribe(mqttTopic)

  // redis
  const handlersRedis = await initRedis({ host: redisHost, port: redisPort })
  await handlersRedis.delete(mqttTopic)

  // store
  const { postData } = storeApi(storeApiUrl)

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

      if ((await handlersRedis.getLength(dataTopic)) >= 2) {
        const jsonData = await handlersRedis.pullAll(mqttTopic)
        const agentData = jsonData.map((item) => JSON.parse(item))

        const response = await postData(agentData)
        // if (!response.success) throw new Error('Error from store')
        console.log(response)
        await handlersRedis.delete(mqttTopic)
      }
      console.log({ dataTopic, aggregatedData })
      await handlersRedis.push(dataTopic, aggregatedData)
    } catch (err) {
      console.log('Hub:', err)
      process.exit(1)
    }
  })
}

app()
