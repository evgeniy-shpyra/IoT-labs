const agentService = (repositories) => {
  const agentRepo = repositories.agent

  return {
    createAgent: async (payload) => {
      const isCreated = await agentRepo.create(payload)
      return isCreated
    },
    getAllAgent: async () => {
      const data = await agentRepo.getAll()
      return data
    },
    getOneAgent: async (id) => {
      const data = await agentRepo.getOne(id)
      return data
    },
    updateAgent: async (data, id) => {
      const isUpdated = await agentRepo.update(data, id)
      return isUpdated
    },
    deleteAgent: async (id) => {
      const isDeleted = await agentRepo.delete(id)
      return isDeleted
    },
  }
}

export default agentService
