import Ajv from "ajv"

const ajv = new Ajv()

const validator = (data, schema) => {

  const validate = ajv.compile(schema)
  const valid = validate(data)
  
  return valid
}

export default validator
