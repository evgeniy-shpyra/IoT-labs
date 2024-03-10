const aggregateData = (data) => {
  return {
    x: +data.accelerometer.x,
    y: +data.accelerometer.y,
    z: +data.accelerometer.z,
    longitude: +data.gps.longitude,
    latitude: +data.gps.latitude,
    user_id: +data.user_id,
    road_state: data.road_state,
    timestamp: data.timestamp,
  }
}

export default aggregateData