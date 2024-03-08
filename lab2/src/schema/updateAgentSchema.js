import statusCodes from '../controllers/statusCodes.js'

const updateAgentSchema = {
  description: 'update',
  tags: ['processed_agent_data'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      road_state: { type: 'string' },
      user_id: { type: 'number' },
      x: { type: 'integer' },
      y: { type: 'integer' },
      z: { type: 'integer' },
      latitude: { type: 'number' },
      longitude: { type: 'number' },
      timestamp: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: [
      'road_state',
      'x',
      'y',
      'z',
      'latitude',
      'longitude',
      'user_id',
      'timestamp',
    ],
  },
  response: {
    [statusCodes.ok]: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  },
}

export default updateAgentSchema
