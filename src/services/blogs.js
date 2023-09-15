import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const authType = 'Bearer'

const setToken = newToken => {
  token = newToken
}

const setConfig = () => {
  const config = {
    headers :{
      authorizationType: authType,
      authorization: token
    }
  }
  return config
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, setConfig())
  console.log(response)
  return response.data
}

const put = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, setConfig())
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig())
  return response.data
}

export default {
  getAll,
  getById,
  setToken,
  create,
  put,
  remove
}