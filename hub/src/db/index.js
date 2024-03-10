import { Sequelize } from 'sequelize'
import Agent from './models/agent.js'
import agentRepo from './repositories/agent.js'

const initRepo = (sequelize) => ({
  agent: agentRepo(sequelize),
})

const initModels = async (sequelize) => {
  Agent(sequelize)
  await sequelize.sync({ force: true })
  // await sequelize.sync({ alter: true })
}

const DB = ({ user, password, host, name, port }) => {

  const sequelize = new Sequelize(
    `postgres://${user}:${password}@${host}:${port}/${name}`
  )
  return {
    start: async () => {
      try {
        await sequelize.authenticate()
        console.log('Db has been started')
      } catch (error) {
        console.error(`Couldn't start db:`, error)
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
