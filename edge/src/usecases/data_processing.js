const processAgentData = (agentData) => {
  let roadState = null
  if (agentData.accelerometer.y < 40) {
    roadState = 'pit'
  } else if (agentData.accelerometer.y > 100) {
    roadState = 'hump'
  } else {
    roadState = 'normal'
  }

  return roadState
}

export default processAgentData
