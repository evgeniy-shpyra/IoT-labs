const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      x: { type: "string" },
      y: { type: "string" },
      z: { type: "string" },
    },
    required: ["x", "y", "z"],
    additionalProperties: false,
  },
}

export default schema
