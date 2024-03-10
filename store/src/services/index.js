import agentService from './agent.js'

const initServices = (repositories) => ({
  agent: agentService(repositories),
})

export default initServices
