import statusCodes from '../controllers/statusCodes.js'

const wsSchema = {
  description: 'subscribe',
  tags: ['subscribe'],
  params: {
    type: 'object',
    properties: {
      user_id: { type: 'integer' },
    },
    required: ['user_id'],
    additionalProperties: false,
  },
}

export default wsSchema
