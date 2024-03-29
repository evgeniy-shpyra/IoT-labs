import { connect, readData, sendData } from './services/index.js'
import { validator, wait } from './utils/index.js'

import accelerometerSchema from './schema/accelerometerSchema.js'
import aggregatedDataSchema from './schema/aggregatedDataSchema.js'
import gpsSchema from './schema/gpsSchema.js'
import parkingSchema from './schema/parkingSchema.js'


const files = [
  './data/accelerometer.csv',
  './data/gps.csv',
  './data/parking.csv',
]

const aggregate = ({ gps, accelerometer, user_id }) => {
  const data = {
    gps,
    accelerometer,
    user_id,
    timestamp: new Date().toISOString(),
  }

  const isValid = validator(data, aggregatedDataSchema)
  if (isValid) return data

  throw new Error("Aggregated data isn't valid")
}

const validateData = ({ accelerometer, gps, parking }) => {
  const errors = []

  const isValidAcc = validator(accelerometer, accelerometerSchema)
  if (!isValidAcc) errors.push("Accelerometer data isn't valid")

  const isValidGps = validator(gps, gpsSchema)
  if (!isValidGps) errors.push("Gps data isn't valid")

  const isValidPar = validator(parking, parkingSchema)
  if (!isValidPar) errors.push("Parking data isn't valid")

  return errors
}

const app = async () => {
  try {
    // create reader
    const readLine = readData(files)

    // create a connect
    const broker = process.env.MQTT_BROKER_HOST || '0.0.0.0'
    const port = process.env.MQTT_BROKER_PORT || '1883'
    const client = await connect({ broker, port })

    const gpsAccTopic = process.env.GPS_ACC_TOPIC || 'processed_data_topic'
    const parkingTopic = process.env.PARKING_TOPIC || 'agent/parking'

    // // send data
    const delay = Number(process.env.DELAY) || 100
    const user_id = process.env.USER_ID || 1

    while (true) {
      // read line
      const { accelerometer, gps, parking } = await readLine()

      // validation
      const errors = validateData({ accelerometer, gps, parking })
      if (errors.length) throw new Error(errors.join(', '))

      const gpsAccMes = aggregate({
        accelerometer,
        gps,
        user_id,
      })

      await sendData({
        client,
        data: JSON.stringify(gpsAccMes),
        topic: gpsAccTopic,
      })

      await sendData({
        client,
        data: JSON.stringify(parking),
        topic: parkingTopic,
      })

      await wait(delay)
    }
  } catch (e) {
    console.log('Main error: ', e)
  }
}

console.log('Run application')
app()
