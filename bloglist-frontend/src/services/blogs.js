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

const postBlog = async ({title, url, author}, token) => {
    console.log('postBlog')

    const config = {
        headers: { Authorization: `bearer ${token}` },
    }

    const res = await axios.post('/api/blogs', {title, url, author}, config)
    return res.data
}

export default { getAll, login, postBlog}
