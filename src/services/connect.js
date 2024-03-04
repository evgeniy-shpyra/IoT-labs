import MQTT from "async-mqtt"

const connect = async ({ broker, port }) => {
  const url = `mqtt://${broker}:${port}`

  const client = await MQTT.connectAsync(url)

  try {
    const client = await asyncMqtt.connectAsync(url)
    console.log(`Connected to ${url}`)
    return client
  } catch (e) {
    console.log(`Can't connect to ${client}`)
    throw e
  }
}

export default connect
