import agent from './agent.js'
import createAgentData from './schema/createAgentData.js'
import deleteAgentData from './schema/deleteAgentData.js'

const initControllers = (services) => {
  
  const agentService = services.agent
  const agentController = agent(agentService)

  return {
    post: {
      processed_agent_data: {
        handler: agentController.createAgent,
        schema: createAgentData,
      },
    },
    get: {
      'processed_agent_data': {
        handler: agentController.getAllAgent,
        schema: null,
      },
      'processed_agent_data/:id': {
        handler: agentController.getOneAgent,
        schema: null,
      },
    },
    put: {
      'processed_agent_data/:id': {
        handler: agentController.updateAgent,
        schema: null,
      },
    },
    delete: {
      'processed_agent_data/:id': {
        handler: agentController.deleteAgent,
        schema: deleteAgentData,
      },
    },
  }
}

export default initControllers
