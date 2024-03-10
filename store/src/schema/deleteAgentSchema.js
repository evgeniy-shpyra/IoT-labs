import statusCodes from '../controllers/statusCodes.js'

const deleteAgentSchema = {
  description: 'delete the',
  tags: ['processed_agent_data'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  response: {
    [statusCodes.noContent]: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  },
}

export default deleteAgentSchema
