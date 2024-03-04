import accelerometerSchema from "./schema/accelerometerSchema.js"
import gpsSchema from "./schema/gpsSchema.js"
import readData from "./services/readData.js"

const app = async () => {
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

  
  console.log(data)
}

app()
