import React, {useState} from 'react'


const Blog = ({ blog }) => {
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

    const blogDetails = () => (
        <div>
            <p> { blog.url } </p>
            <p> { blog.likes } <button> like </button></p>
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
