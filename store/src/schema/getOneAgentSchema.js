import statusCodes from '../controllers/statusCodes.js'

const getOneAgentSchema = {
  description: 'get one',
  tags: ['processed_agent_data'],
  params: {
    type: 'object',
    properties: {
      user_id: { type: 'integer' },
    },
    additionalProperties: false,
    required: ['user_id'],
  },
  response: {
    [statusCodes.ok]: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        payload: {
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
        },
      },
    },
  },
}

export default getOneAgentSchema
