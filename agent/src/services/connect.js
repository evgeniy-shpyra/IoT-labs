import MQTT from 'async-mqtt'

const connect = async () => {
  const broker = process.env.MQTT_BROKER_HOST || '0.0.0.0'
  const port = process.env.MQTT_BROKER_PORT || '1883'
  const url = `mqtt://${broker}:${port}`
  let client = null
  try {
    client = await MQTT.connectAsync(url)
    console.log(`Connected to ${url}`)
    return client
  } catch (e) {
    console.log(`Can't connect to ${client}`)
    throw e
  }
}

export default connect
