import csv from "csvtojson"
import fs from "node:fs"
import path from "node:path"

const parseCsv = async (csvPath) => {
  const readStream = fs.createReadStream(path.resolve(csvPath))

  const data = []

  await readStream
    .pipe(csv())
    .on("data", (row) => {
      data.push(JSON.parse(row.toString()))
    })
    .on("error", (error) => {
      throw new Error(`Error converting CSV to JSON: ${error.message}`)
    })

  readStream.close()

  return data
}

export default parseCsv
