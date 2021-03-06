import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  useEffect(fetchBlogs, [])

  const notificationHook = () => {
    setTimeout( () => setNotification(null), 5000)
  }
  useEffect( notificationHook, [notification])

  const loadUser = () => {
    const user = window.localStorage.getItem('user')
    if (user) setUser(JSON.parse(user))
  }
  useEffect(loadUser, [])

  const login = async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    if (user.error) {
      setNotification('!e' + user.error)
    }else{
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setNotification(`bye ${user.name}`)
    setUser(null)
  }

  const createBlog = async ({ title, url, author }) => {
    const blog = await blogService.postBlog({ title, url, author }, user.token)
    if (blog.error){
      setNotification('!e' + blog.error)
    }else{
      blogFormRef.current.toggleVisibility()
      setNotification(`blog added "${blog.title}" by "${blog.author}"`)
    }
  }

  const likeBlog = async (blog) => {
    console.log('app.js',blog)
    const updatedBlog =  await blogService.likeBlog(blog)
    if (updatedBlog.error){
      setNotification('!e'+updatedBlog.error)
    } else {
      blog.likes = updatedBlog.likes
      return updatedBlog.likes
    }
  }

  const deleteBlog = async (blog) => {
    console.log('app.js',blog)
    const removed = await blogService.deleteBlog(blog.id, user.token)
    console.log(removed)
    if (removed.error){
      setNotification('!e'+removed.error)
    } else {
      setNotification(`${removed.title} deleted`)
      fetchBlogs()
    }
  }

  const showLoggedInMsg = () => (
    <div id='welcome'>
            Welcome {user.name} !
      <button onClick={logout}> logout </button>
    </div>
  )

  const showLoginForm = () => (
    <div>
      <h2>login</h2>
      <Login login= {login}/>
    </div>
  )

  const showBlogForm = () => (
    <Togglable buttonName='add blog' ref={blogFormRef}>
      <h2> new blog details</h2>
      <BlogForm createBlog = {createBlog}/>
    </Togglable>
  )


  return (
    <div>
      <Notification msg={notification}/>

      {user && showLoggedInMsg()}
      {user && showBlogForm()}
      {!user && showLoginForm()}

      <h2>blogs</h2>
        <div id='blogList'>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog= {likeBlog} deleteBlog= {deleteBlog} user= {user}/>
            )}
        </div>

    </div>
  )
}

export default App
