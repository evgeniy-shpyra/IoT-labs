import { Sequelize } from 'sequelize'
import Agent from './models/agent.js'
import agentRepo from './repositories/agent.js'

const initRepo = (sequelize) => ({
  agent: agentRepo(sequelize),
})

const initModels = async (sequelize) => {
  const AgentModel = Agent(sequelize)

  // await sequelize.sync({ force: true })
  await sequelize.sync({ alter: true})
}

const DB = ({ password, login, name }) => {
  const sequelize = new Sequelize(name, login, password, {
    dialect: "postgres",
    logging: false,
  })

  return {
    start: async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1)
      }
      await initModels(sequelize)
      const repositories = await initRepo(sequelize)
      return repositories
    },

    stop: async () => {
      try {
        await sequelize.close()
        console.log('Db has been closed')
      } catch (err) {
        console.log('An error occurred while closing the db', err)
      }
    },
  }
}
export default DB
