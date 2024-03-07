const sendData = async ({ client, data, topic }) => {
  try {
    await client.publish(topic, data)
    console.log(`Done: ${topic}`)
  } catch (e) {
    console.log(e)
    console.error(`Failed to send message to topic: ${topic}`)
  }
}

export default sendData
