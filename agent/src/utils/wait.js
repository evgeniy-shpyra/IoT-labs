const wait = (ms) => new Promise((res) => setTimeout(res, ms).unref())

export default wait
