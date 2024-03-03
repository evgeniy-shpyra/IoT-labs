import accelerometerSchema from "./schema/accelerometerSchema.js"
import gpsSchema from "./schema/gpsSchema.js"
import readData from "./services/readData.js"

const app = async () => {
  const [readingErrors, data] = await readData([
    {
      path: "./data/accelerometer.csv",
      schema: accelerometerSchema,
    },
    {
      path: "./data/gps.csv",
      schema: gpsSchema,
    },
  ])

  if (readingErrors.length) {
    for (const error of readingErrors) {
      console.error(error)
    }
    process.exit(1)
  }

  console.log(data)
}

app()
