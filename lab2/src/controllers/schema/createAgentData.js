const createAgentData = {
  body: {
    type: 'object',
    properties: {
      road_state: { type: 'string' },
      x: { type: 'number' },
      y: { type: 'number' },
      z: { type: 'number' },
      longitude: { type: 'number' },
      latitude: { type: 'number' },
      user_id: { type: 'number' },
      timestamp: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: [
      'longitude',
      'latitude',
      'x',
      'y',
      'z',
      'timestamp',
      'user_id',
      'road_state',
    ],
    additionalProperties: false,
  }
}

export default createAgentData
