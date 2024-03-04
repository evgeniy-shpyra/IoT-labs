import parseCsv from "../utils/parseCsv.js"
import validation from "../utils/validator.js"

const readData = async (src = []) => {
  const errors = []
  const data = {}

  for (const { path, schema } of src) {
    try {
      const readData = await parseCsv(path)
      const isValid = validation(readData, schema)
      const name = path.split("/").at(-1).split(".").at(0)

      if (isValid) {
        data[name] = readData
        continue
      }
      throw new Error(`Data is't valid: ${name}`)
    } catch (e) {
      errors.push({ message: e.message, path })
    }
  }

  if(errors){
    console.log("Errors:", errors)
    process.exit(1)
  }

  return data
}

export default readData
