const agentService = (repositories) => {
  const agentRepo = repositories.agent

  return {
    createAgent: async (payload) => {
      await agentRepo.create(payload)
      return payload
    },
    getAllAgent: async (payload) => {},
    getOneAgent: async (payload) => {},
    updateAgent: async (payload) => {},
    deleteAgent: async (id) => {
      const response = await agentRepo.delete(id)
      
      return id
    },
  }
}

export default agentService
