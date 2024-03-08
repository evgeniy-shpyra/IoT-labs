import statusCodes from '../controllers/statusCodes.js'

const getAllAgentSchema = {
  description: 'get all',
  tags: ['processed_agent_data'],
  response: {
    [statusCodes.ok]: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        payload: {
          type: 'array',
          items: {
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
  },
}

export default getAllAgentSchema
