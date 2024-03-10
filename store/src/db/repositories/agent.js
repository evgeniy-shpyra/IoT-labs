const repo = (sequelize) => {
  const Agent = sequelize.models.processed_agent_data

  return {
    bulkCreate: async (payload) => {
      await Agent.bulkCreate(payload)
      return true
    },
    getAll: async () => {
      const data = await Agent.findAll({ raw: true })
      return data
    },
    update: async (data, id) => {
      const response = await Agent.update(data, {
        where: {
          id,
        },
      })
      return Boolean(response[0])
    },
    getOne: async (id) => {
      const data = await Agent.findOne({
        where: {
          id,
        },
      })

      return data
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
