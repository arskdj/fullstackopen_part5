import React, { useState, useEffect } from 'react'
import service from '../services/blogs'

const BlogForm = ({token}) => {
    const [title, setTitle] = useState('newtitle')
    const [url, setUrl] = useState('newurl')
    const [author, setAuthor] = useState('newauthor')

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('handleSubmit')
        const blog = await service.postBlog({title, url, author}, token)
        alert('blog added', blog)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div> title 
                    <input value={title} onChange={({target}) => setTitle(target.value) } />
                </div>
                <div> url 
                    <input value={url} onChange={({target}) => setUrl(target.value) } />
                </div>
               <div> author
                    <input value={author} onChange={({target}) => setAuthor(target.value) } />
               </div> 
                <button type="submit"> add blog</button>
            </form>
        </div>
    )
}
export default BlogForm
