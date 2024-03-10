import agent from './agent.js'
import createAgentSchema from '../schema/createAgentSchema.js'
import deleteAgentSchema from '../schema/deleteAgentSchema.js'
import updateAgentSchema from '../schema/updateAgentSchema.js'
import getAllAgentSchema from '../schema/getAllAgentSchema.js'
import getOneAgentSchema from '../schema/getOneAgentSchema.js'

const initControllers = (services) => {
  const agentService = services.agent
  const agentController = agent(agentService)

  return {
    post: {
      processed_agent_data: {
        handler: agentController.createAgent,
        schema: createAgentSchema,
      },
    },
    get: {
      'processed_agent_data': {
        handler: agentController.getAllAgent,
        schema: getAllAgentSchema,
      },
      'processed_agent_data/:id': {
        handler: agentController.getOneAgent,
        schema: getOneAgentSchema,
      },
    },
    put: {
      'processed_agent_data/:id': {
        handler: agentController.updateAgent,
        schema: updateAgentSchema,
      },
    },
    delete: {
      'processed_agent_data/:id': {
        handler: agentController.deleteAgent,
        schema: deleteAgentSchema,
      },
    },
  }
}

export default initControllers
