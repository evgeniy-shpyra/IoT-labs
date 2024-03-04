import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const validator = (data, schema) => {
  const validate = ajv.compile(schema)
  const valid = validate(data)

  return valid
}

export default validator
