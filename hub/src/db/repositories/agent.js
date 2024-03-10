const repo = (sequelize) => {
  const Agent = sequelize.models.processed_agent_data

  return {
    createBulk: async (payload) => {
      const response = await Agent.bulkCreate(payload)
      return true
    },
    
  }
}

export default repo
