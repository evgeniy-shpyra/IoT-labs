const repo = (sequelize) => {
  const Agent = sequelize.models.processed_agent_data

  return {
    create: async (payload) => {
      await Agent.create(payload)
    },
    delete: async (id) => {
      const response = await Agent.destroy({
        where: {
          id,
        },
      })
      return Boolean(response)
    },
  }
}

export default repo
