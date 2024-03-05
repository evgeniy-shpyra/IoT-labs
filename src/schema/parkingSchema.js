const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      gps: {
        type: "object",
        properties: {
          longitude: { type: "string", format: "float", },
          latitude: { type: "string", format: "float", },
        },
        required: ["longitude", "latitude"],
        additionalProperties: false,
      },
      empty_count: {
        type: "string",
        format: "int",
      },
    },
    required: ["gps", "latitude"],
    additionalProperties: false,
  },
}

export default schema
