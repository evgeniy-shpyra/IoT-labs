import {
  createAgentService,
  getAllAgentService,
  getOneAgentService,
  updateAgentService,
  deleteAgentService,
} from '../services/agent.js'

export const createAgent = async (payload) => {
  const response = await createAgentService(payload)
  return response
}
export const getAllAgent = async (payload) => {
  const response = await getAllAgentService(payload)
  return response
}
export const getOneAgent = async (payload) => {
  const response = await getOneAgentService(payload)
  return response
}
export const updateAgent = async (payload) => {
  const response = await updateAgentService(payload)
  return response
}
export const deleteAgent = async (payload) => {
  const response = await deleteAgentService(payload)
  return response
}
