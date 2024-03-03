import readCsv from "./utils/readCsv.js"


const app = async () => {
  const accelerometerData = await readCsv('./data/accelerometer.csv')
  const gpsData = await readCsv('./data/gps.csv')


  console.log(accelerometerData)
  console.log(gpsData)
}

app()
