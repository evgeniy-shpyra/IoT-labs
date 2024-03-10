import MQTT from 'async-mqtt'

const connectMqt = async ({broker, port}) => {
  const url = `mqtt://${broker}:${port}`

  try {
    const client = await MQTT.connectAsync(url)
    console.log(`Connected to ${url}`)
    return client
  } catch (e) {
    console.log(`Can't connect to ${url}`, e)
    process.exit(1)
  }
}

export default connectMqt