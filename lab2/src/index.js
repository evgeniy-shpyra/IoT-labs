import http from './transport/http.js'
import agentRoutes from './controllers/agent.js'
import agentController from './controllers/agent.js'


const routes = {
  post: {
    processed_agent_data: {
      handler: agentController.createAgent,
      schema: null,
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
    '/processed_agent_data/:id': {
      handler: agentController.updateAgent,
      schema: null,
    },
  },
  delete: {
    '/processed_agent_data/:id': {
      handler: agentController.deleteAgent,
      schema: null,
    },
  },
}

const start = async () => {
  const httpServer = http()

  await httpServer.start()

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  function shutdown() {
    console.log('closing with grace...')
    stop()
    setTimeout(() => process.exit(1), shutdownMaxWait).unref()
  }
}

start()
