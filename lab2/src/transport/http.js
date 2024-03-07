import Fastify from 'fastify'
import ajvFormats from 'ajv-formats'

const http = (controllers = {}, opt = {}) => {
  const server = Fastify({
    logger: false,
    ajv: {
      plugins: [ajvFormats],
    },
  })

  for (const [method, handlers] of Object.entries(controllers)) {
    for (const [route, handlerData] of Object.entries(handlers)) {
      const params = {}
      if (handlerData.schema) params.schema = handlerData.schema
       
      server[method](`/${route}`, params, async function (request, reply) {
        try {
          const body = request.body
          const params = request.params
          const response = await handlerData.handler(body, params)
          reply.code(200).send(response)
        } catch (e) {
          console.error(e)
          reply.code(400).send({ error: e.message })
        }
      })
    }
  }

  return {
    start: async () => {
      const port = opt.port || 3000
      try {
        await server.listen({ port })
        console.log(`Server running at port: ${port}`)
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

export default http
