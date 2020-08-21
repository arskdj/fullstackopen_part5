import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setNotification }) => {
    const [likes, setLikes] = useState(blog.likes)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [show, setShow] = useState(false)
    const buttonName = show ? 'hide' : 'view'

    const toggleDetails = () => {
        setShow(!show)
    }

    const incLikes = async () => {
        console.log('incLikes',blog)
        const updatedBlog =  await blogService.likeBlog(blog)
        if (updatedBlog.error){
            setNotification('!e'+updatedBlog.error)
        } else {
            setLikes(updatedBlog.likes)
            blog.likes = updatedBlog.likes
        }
    }

    const blogDetails = () => (
        <div>
            <p> { blog.url } </p>
            <p> { likes } <button onClick={incLikes}> like </button></p>
            <p> { blog.author } </p>
        </div>
    )

    return (
        <div style={blogStyle}>
            {blog.title}
            <button onClick={toggleDetails}> {buttonName} </button>
            {show && blogDetails()}
        </div>
    )
}

export default Blog
