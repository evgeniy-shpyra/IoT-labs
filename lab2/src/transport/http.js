import Fastify from 'fastify'

const http = (routes = {}, opt = {}) => {
  const server = Fastify({
    logger: false,
  })

  for (const [method, handlers] of Object.entries(routes)) {
    for (const [route, handlerData] of Object.entries(handlers)) {
      const params = {}
      if (handlerData.schema) params.schema = handlerData.schema
      server[method](`/${route}`, params, async function (request, reply) {
        try {
          const response = await handlerData.handler(request.body)
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
