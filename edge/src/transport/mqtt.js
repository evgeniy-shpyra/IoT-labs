import MQTT from 'async-mqtt'


const mqtt = async ({ broker, port }) => {
  const url = `mqtt://${broker}:${port}`
  let client = null

  try {
    client = await MQTT.connectAsync(url)
    console.log(`Connected to ${url}`)
  } catch (e) {
    console.log(`Can't connect to: ${url}`)
    throw e
  }

  const subscribers = []

  client.on('message', async (currTopic, message) => {
      const subscriber = subscribers.find(s => s.topic === currTopic)
      if(!subscriber) return
      subscriber.callback(message.toString())
  })

  return {
    postData: async (topic, data) => {
      try {
        await client.publish(topic, data)
        return true
      } catch (e) {
        console.log(e)
        console.error(`Failed to send message to topic: ${topic}`)
        return false
      }
    },
    subscribe: async (topic, callback) => {
      await client.subscribe(topic)
      subscribers.push({topic, callback})
    },
    close: async () => {
      await client.end();
    }
  }
}

export default mqtt
