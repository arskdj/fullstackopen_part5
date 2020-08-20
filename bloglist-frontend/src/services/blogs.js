import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const login = async ({username, password}) => {
    console.log('login service')
    const res = await axios.post('/api/login', {username, password})
    return res.data.token
}

export default { getAll, login }
