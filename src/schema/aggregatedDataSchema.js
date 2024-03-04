const schema = {
  type: "object",
  properties: {
    accelerometer: {
      type: "object",
      properties: {
        x: { type: "string" },
        y: { type: "string" },
        z: { type: "string" },
      },
      required: ["x", "y", "z"],
      additionalProperties: false,
    },
    gps: {
      type: "object",
      properties: {
        longitude: { type: "string" },
        latitude: { type: "string" },
      },
      required: ["longitude", "latitude"],
      additionalProperties: false,
    },
    timestamp: {
      type: "string",
      format: "date-time",
    },
    user_id: {
      type: "string",
      format: "uuid",
    },
  },
  required: ["gps", "accelerometer", "timestamp", "user_id"],
  additionalProperties: false,
}

export default schema
