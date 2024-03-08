import server from './server/server.js'
import initControllers from './controllers/index.js'
import initServices from './services/index.js'
import DB from './db/index.js'


const start = async () => {
  const dbPassword = process.env.POSTGRES_PASSWORD || 'pass'
  const dbLogin = process.env.POSTGRES_USER || 'user'
  const dbName = process.env.POSTGRES_DB || 'test_db'

  const db = DB({ password: dbPassword, login: dbLogin, name: dbName })
  const repositories = await db.start()
  
  const services = initServices(repositories)
  const controllers = initControllers(services)
  
  const httpServer = await server(controllers)
  
  const httpPort = process.env.HTTP_PORT || 8000
  const httpHost = process.env.HTTP_HOST || '0.0.0.0'
  await httpServer.start(httpPort, httpHost)

  const shutdownMaxWait = 5000
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  function shutdown() {
    console.log('closing with grace...')
    httpServer.stop()
    db.stop()
    setTimeout(() => process.exit(1), shutdownMaxWait).unref()
  }
}

start()
