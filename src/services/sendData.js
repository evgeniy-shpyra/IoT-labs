import wait from "../utils/wait.js"
import validator from "../utils/validator.js"
import aggregatedDataSchema from "../schema/aggregatedDataSchema.js"

const aggregate = ({ gps, accelerometer, uuid }) => {
  const data = {
    gps,
    accelerometer,
    user_id: uuid,
    timestamp: new Date().toISOString(),
  }

  const isValid = validator(data, aggregatedDataSchema)

  if (isValid) return data

  throw new Error("Aggregated data isn't valid")
}

const sendData = async ({ client, data, delay = 100, uuid }) => {
  const { accelerometer, gps } = data
  const topic = "test"

  while (true) {
    for (let i = 0; i <= accelerometer.length; i++) {
      const message = aggregate({
        accelerometer: accelerometer[i],
        gps: gps[i],
        uuid,
      })

      try {
        await client.publish(topic, JSON.stringify(message))
        console.log(`Done: ${topic}`)
      } catch (e) {
        console.log(e)
        console.error(`Failed to send message to topic: ${topic}`)
      }

      await wait(delay)
    }
  }
}

export default sendData
