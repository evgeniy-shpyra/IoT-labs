const deleteAgentData = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
}

export default deleteAgentData
