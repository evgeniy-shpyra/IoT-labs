import csv from "csvtojson"
import fs from "node:fs"
import path from "node:path"

const readCsv = async (csvPath) => {
  const readStream = fs.createReadStream(path.resolve(csvPath))

  const data = []

  await readStream
    .pipe(csv())
    .on("data", (row) => {
      data.push(JSON.parse(row.toString()))
    })
    .on("end", () => {
      console.log("CSV to JSON conversion completed.")
    })
    .on("error", (error) => {
      console.error("Error converting CSV to JSON:", error.message)
    })

  readStream.close()

  return data
}

export default readCsv
