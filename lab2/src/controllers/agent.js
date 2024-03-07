
const agentController = (service) => {
  return {
    createAgent: async (body, params) => {
      const response = await service.createAgent(body)
      return response
    },
    getAllAgent: async (body, params) => {
      const response = await service.getAllAgent(payload)
      return response
    },
    getOneAgent: async (body, params) => {
      const response = await service.getOneAgent(payload)
      return response
    },
    updateAgent: async (body, params) => {
      const response = await service.updateAgent(payload)
      return response
    },
    deleteAgent: async (body, params) => {
      const id = params.id
      const response = await service.deleteAgent(id)
      return response
    },
  }
}

export default agentController
