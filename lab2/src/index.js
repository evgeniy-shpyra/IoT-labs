import http from './transport/http.js'
import initControllers from './controllers/index.js'
import initServices from './services/index.js'
import DB from './db/index.js'


const start = async () => {
  const dbPassword = process.env.DB_PASSWORD
  const dbLogin = process.env.DB_LOGIN
  const dbName = process.env.DB_NAME || 'agent'

  const db = DB({ password: dbPassword, login: dbLogin, name: dbName })
  
  const repositories = await db.start()


  const services = initServices(repositories)
  const controllers = initControllers(services)
  
  const httpServer = http(controllers)

  await httpServer.start()

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
