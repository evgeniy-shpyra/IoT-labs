import MQTT from 'async-mqtt'

const agrigateData = () => {
  
}

const mqttConnect = async ({broker, port}) => {
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

export default mqttConnect
