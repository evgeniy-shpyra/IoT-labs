import mqtt from './transport/mqtt.js'
import validator from './utils/validator.js'
import agentDataSchema from './schema/agentDataSchema.js'
import processAgentDataSchema from './schema/processAgentDataSchema.js'
import processAgentData from './usecases/data_processing.js'

const broker = process.env.MQTT_BROKER_HOST || '0.0.0.0'
const port = process.env.MQTT_BROKER_PORT || '1883'

const agentTopic = process.env.AGENT_TOPIC || 'agent_data_topic'
const hubTopic = process.env.HUB_TOPIC || 'processed_data_topic'
const shutdownMaxWait = process.env.SHUTDOWN_MAX_WAIT || 5000

const app = async () => {

  try {
    const mqttClient = await mqtt({ broker, port })

    const handleAgent = (data) => {

      const agentData = JSON.parse(data)

      const isValidAgentData = validator(agentData, agentDataSchema)
      if (!isValidAgentData) {
        console.log("Agent data isn't valid")
        return
      }

      const road_state = processAgentData(agentData)
      const processedData = { ...agentData, road_state }

      const isValidProcessedData = validator(processedData, processAgentDataSchema)
      if (!isValidProcessedData) {
        console.log("Processed data data isn't valid")
        return
      }

      mqttClient.postData(hubTopic, JSON.stringify(processedData))
    }

    await mqttClient.subscribe(agentTopic, handleAgent)

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    function shutdown() {
      console.log('closing with grace...')
      mqttClient.close()
      setTimeout(() => process.exit(1), shutdownMaxWait).unref()
    }
  } catch (e) {
    console.error(e)
  }
}

app()
