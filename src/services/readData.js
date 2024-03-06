import validation from '../utils/validator.js'
import path from 'node:path'
import { createReadStream } from 'node:fs'
import timers from 'node:timers/promises'
import csv from 'csvtojson'
import { createInterface } from 'node:readline'

const createStream = (file) => {
  const filePath = path.resolve(file)
  const rl = createInterface({
    input: createReadStream(filePath).pipe(csv()),
  })
  return rl[Symbol.asyncIterator]()
}

const readData = (files) => {
  const streams = files.map((file) => {
    const name = file.split('/').at(-1).split('.').at(0)
    return { iterator: createStream(file), name, file }
  })

  const readLine = async () => {
    const data = {}
    for (const stream of streams) {
      let value = null
      const { name, iterator, file } = stream
      const currData = await iterator.next()

      if (currData.done) {
        stream.iterator = createStream(file)
        const firstData = await iterator.next()
        value = firstData.value
      } else {
        value = currData.value
      }

      data[name] = JSON.parse(value)
    }
    return data
  }

  return { readLine }
}

export default readData
