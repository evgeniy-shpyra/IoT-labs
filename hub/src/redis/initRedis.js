import redis from 'redis'

const initRedis = async ({ host, port }) => {
  const client = redis.createClient({
    socket: { host, port },
  })
  client.on('error', (err) => {
    console.log('Redis Client Error:', err)
    process.exit(1)
  })
  await client.connect()

  return {
    push: async (key, data) => {
      await client.rPush(key, JSON.stringify(data))
    },
    pullAll: async (key) => {
      const data = await client.lRange(key, 0, -1)

      return data
    },
    delete: async (key) => {
      await client.del(key)
    },
    getLength: async (key) => {
      const length = await client.lLen(key)
      return length
    },
  }
}

export default initRedis
