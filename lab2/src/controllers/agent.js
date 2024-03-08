import statusCodes from './statusCodes.js'

const createResponse = (statusCode, data = null, errors = null) => {
  const response = { success: !errors }
  if (data) {
    response.payload = data
  }
  if (errors) {
    response.errors = errors
  }

  return [statusCode, response]
}

const agentController = (service) => {
  return {
    createAgent: async (body) => {
      const isCreated = await service.createAgent(body)
      if (isCreated) return createResponse(statusCodes.created)
      return createResponse(statusCodes.error, null, `Can't create the agent`)
    },
    getAllAgent: async () => {
      const response = await service.getAllAgent()
      return createResponse(statusCodes.ok, response)
    },
    getOneAgent: async (_, params) => {
      const id = params.id
      const response = await service.getOneAgent(id)
      if(!response) return createResponse(statusCodes.notFound, response, `Agent with id ${id} doesn't exist`)
      return createResponse(statusCodes.ok, response)
    },
    updateAgent: async (body, params) => {
      const id = params.id
      const response = await service.updateAgent(body, id)
      if(!response) return createResponse(statusCodes.notFound, null, `Agent with id ${id} doesn't exist`)
      return createResponse(statusCodes.ok)
    },
    deleteAgent: async (_, params) => {
      const id = params.id
      const isDeleted = await service.deleteAgent(id)
      if (isDeleted) return createResponse(statusCodes.noContent)
      return createResponse(
        statusCodes.notFound,
        null,
        `Can't delete agent with id: ${id}`
      )
    },
  }
}

export default agentController
