const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      longitude: { type: "string" },
      latitude: { type: "string" },
    },
    required: ["longitude", "latitude"],
    additionalProperties: false,
  },
}

export default schema
