import { connect, readData, sendData } from "./services/index.js"
import { validator, wait } from "./utils/index.js"

import {
  accelerometerSchema,
  aggregatedDataSchema,
  gpsSchema,
  parkingSchema,
} from "./schema/index.js"

import crypto from "node:crypto"

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

const app = async () => {
  try {
    // read data
    const { accelerometer, gps, parking } = await readData([
      {
        path: "./data/accelerometer.csv",
        schema: accelerometerSchema,
      },
      {
        path: "./data/gps.csv",
        schema: gpsSchema,
      },
      {
        path: "./data/parking.csv",
        schema: parkingSchema,
      },
    ])

    // create a connect
    const broker = process.env.MQTT_BROKER_HOST || "0.0.0.0"
    const port = process.env.MQTT_BROKER_PORT || "1883"
    const client = await connect({ broker, port })

    const gpsAccTopic = process.env.GPS_ACC_TOPIC || "agent/gpsAcc"
    const parkingTopic = process.env.PARKING_TOPIC || "agent/parking"

    // send data
    const delay = Number(process.env.PUBLISH_DELAY) || 100
    const uuid = process.env.UUID || crypto.randomUUID()
    while (true) {
      for (
        let accIndex = 0, gpsIndex = 0, parkingIndex = 0;
        accIndex <= accelerometer.length;
        accIndex++, gpsIndex++, parkingIndex++
      ) {
        if (gpsIndex >= gps.length) gpsIndex = 0
        if (parkingIndex >= parking.length) parkingIndex = 0

        const gpsAccMes = JSON.stringify(
          aggregate({
            accelerometer: accelerometer[accIndex],
            gps: gps[gpsIndex],
            uuid,
          })
        )

        const parkingMsg = JSON.stringify(parking[parkingIndex])

        await sendData({
          client,
          data: gpsAccMes,
          topic: gpsAccTopic,
        })
        await sendData({ client, data: parkingMsg, topic: parkingTopic })
        
    
        await wait(delay)
      }
    }
  } catch (e) {
    console.log('Main error: ', e)
  }
}

console.log("Run application")
app()
