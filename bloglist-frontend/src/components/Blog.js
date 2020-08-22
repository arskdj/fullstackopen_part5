import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog : PropTypes.func.isRequired,
    deleteBlog : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired
  }

  console.log('inblog',blog)
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

  const likeHandler = async () => {
    const likes = await likeBlog(blog)
    setLikes(likes)
  }

  const deleteHandler = async () => {
    window.confirm(`Are you sure you want to delete ${blog.title} ?`) &&
       await deleteBlog(blog)
  }

  const showDeleteButton = () => {
    return  (<button onClick={deleteHandler}> delete </button>)
  }

  const blogDetails = () => (
    <div>
      <p> { blog.url } </p>
      <p> { likes } <button onClick={likeHandler}> like </button></p>
      <p> { blog.author } </p>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleDetails}> {buttonName} </button>
      {user && blog.user &&  user.username === blog.user.username && showDeleteButton()}
      {show && blogDetails()}
    </div>
  )
}

export default Blog
