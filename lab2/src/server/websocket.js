const initWebsocket = (server) => {
  const subscriptions = {}
  server.get('/ws/:user_id', { websocket: true }, (connection, request) => {
    const user_id = request.params.user_id

    if (!subscriptions[user_id]) {
      subscriptions[user_id] = new Set()
    }

    subscriptions[user_id].add(connection.socket)

    connection.socket.on('message', (message) => {
      console.log(message.toString())
    })
    connection.socket.on('close', () => {
      console.log('close')
      subscriptions[user_id].delete(connection.socket)
    })
  })

  return {
    sendDataToSubscribers: async (data) => {
      for (const user_id in subscriptions) {
        for (const socket of subscriptions[user_id]) {
          await socket.send(JSON.stringify(data))
        }
      }
    },
  }
}

export default initWebsocket
