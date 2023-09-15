import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (notification, type) => {
    setNotificationMessage(notification)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      await setUser(user)
      notify(
        `Logged in as ${user.name}`,
        'info'
      )
    } catch (exception) {
      notify(
        'Wrong username or password',
        'error'
      )
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    await setUser(null)
    notify(
      'Logged out',
      'info'
    )
  }

  const logout = (user, handleLogout) => (
    <div id="logout-btn">
      {user.name} logged in
      <button onClick={handleLogout}>log out</button>
    </div>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notify(
        `Blog "${newBlog.title}" by ${newBlog.author} added`,
        'info'
      )
    } catch (exception) {
      notify(
        `Failed to add blog: ${exception}`,
        'error'
      )
    }
  }

  const likeBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.put(id, blogObject)
    setBlogs(blogs.map(blog => (blog.id !== blogObject.id ? blog : updatedBlog)))
  }

  const removeBlog = async blogToRemove => {
    await blogService.remove(blogToRemove.id)
    setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
  }

  const loginForm = () => {
    return (
      <LoginForm
        login={handleLogin}
      />
    )
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="add a new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>
    )
  }

  const showBlogList = () => {
    return (
      <BlogList
        blogs={blogs}
        like={likeBlog}
        user={user}
        remove={removeBlog}
      />
    )
  }

  return (
    <div>
      {!notificationMessage && <h1>Bloglist app</h1>}
      {notificationMessage &&
        <Notification
          message={notificationMessage}
          notificationType={notificationType}
        />
      }
      {!user && loginForm()}
      {user && logout(user, handleLogout)}
      {user && blogForm()}
      {user && showBlogList()}
    </div>
  )
}

export default App