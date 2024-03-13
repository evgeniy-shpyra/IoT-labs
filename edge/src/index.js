import mqttConnect from './transport/mqttConnect.js'

const app = async () => {
  try {
    const broker = process.env.MQTT_BROKER_HOST || '0.0.0.0'
    const port = process.env.MQTT_BROKER_PORT || '1883'
    const mqttClient = await mqttConnect({ broker, port })

    const agentTopic = process.env.AGENT_TOPIC || 'agent_data_topic'
    const hubTopic = process.env.HUB_TOPIC || 'processed_data_topic'

    await mqttClient.subscribe(agentTopic)

    mqttClient.on('message', async (topic, message) => {
      console.log(topic.toString(), message.toString())
      // analytics

      // send to hub
    })
  } catch (e) {
    console.error(e)
  }
}

app()
