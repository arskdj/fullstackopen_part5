import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    let res = null
    try {
        res = await axios.get(baseUrl)
    }catch(error){
        res = error.response
    }
    return res.data
}


const postBlog = async ({title, url, author}, token) => {

    const config = {
        headers: { Authorization: `bearer ${token}` },
    }

    let res = null
    try{
        res = await axios.post('/api/blogs', {title, url, author }, config )
    }catch(error){
        res = error.response
    }

    return res.data
}

export default { getAll, postBlog}
