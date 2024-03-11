import Fastify from 'fastify'
import ajvFormats from 'ajv-formats'
import swagger from '@fastify/swagger'
import cors from '@fastify/cors'
import swaggerConfig from './swaggerConfig.js'
import swaggerUi from '@fastify/swagger-ui'
import websocket from '@fastify/websocket'
import statusCodes from '../controllers/statusCodes.js'
import initWebsocket from './websocket.js'

const server = async (controllers = {}) => {
  const server = Fastify({
    logger: false,
    ajv: {
      plugins: [ajvFormats],
    },
  })

  await server.register(cors, {
    origin: true,
  })

  // Swagger
  await server.register(swagger, {})
  await server.register(swaggerUi, swaggerConfig)

  // Websocket
  await server.register(websocket)
  const { sendDataToSubscribers } = initWebsocket(server)

  // init http routes
  for (const [method, handlers] of Object.entries(controllers)) {
    for (const [route, handlerData] of Object.entries(handlers)) {
      const params = {}
      if (handlerData.schema) params.schema = handlerData.schema

      server[method](`/${route}`, params, async function (request, reply) {
        // test ws
        sendDataToSubscribers({ method, route })

        try {
          const body = request.body
          const params = request.params
          const [code, payload] = await handlerData.handler(body, params)
          reply.code(code).send(payload)
        } catch (e) {
          console.error(e)
          reply.code(statusCodes.error).send({ error: e.message })
        }
      })
    }
  }

  return {
    start: async (port, host) => {
      try {
        await server.listen({ port, host })
        server.ready((err) => {
          if (err) throw err
          server.swagger()
        })
        console.log(`Server running at: ${host}:${port}`)
      } catch (err) {
        console.log('An error occurred while starting the server', err)
      }
    },
    stop: async () => {
      try {
        await server.close()
        console.log('Server has been stopped')
      } catch (err) {
        console.log('An error occurred while stopping the server', err)
      }
    },
  }
}

export default server
