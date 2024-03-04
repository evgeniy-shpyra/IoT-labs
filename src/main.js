import accelerometerSchema from "./schema/accelerometerSchema.js"
import gpsSchema from "./schema/gpsSchema.js"
import connect from "./services/connect.js"
import readData from "./services/readData.js"
import sendData from "./services/sendData.js"
import crypto from "node:crypto"

const app = async () => {
  try {
    // read data
    const data = await readData([
      {
        path: "./data/accelerometer.csv",
        schema: accelerometerSchema,
      },
      {
        path: "./data/gps.csv",
        schema: gpsSchema,
      },
    ])

    const broker = process.env.BROKER_HOST || "0.0.0.0"
    const port = process.env.BROKER_PORT || "1883"
    const client = await connect({ broker, port })

    const myUuid = crypto.randomUUID()

    sendData({ client, data, uuid: myUuid })
  } catch (e) {
    console.log(e)
  }
}

app()
