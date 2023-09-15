import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, user, remove }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const showWhenVisible = { display: showFullInfo ? '' : 'none' }
  const showRemoveButton = user.username === blog.user.username
    ? { display: '' }
    : { display: 'none' }

  const toggleFullInfoVisibility = () => {
    setShowFullInfo(!showFullInfo)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const likeBlog = () => {
    blog.likes = blog.likes + 1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes: blog.likes
    }
    like(blog.id, blogObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      if (window.confirm('Are you sure?')) {
        remove(blog)
      }
    }
  }

  showFullInfo === true
    ? blogStyle.border = 'solid 1px'
    : blogStyle.borderBottom = 'solid 1px'


  return (
    <div style={blogStyle} className='blog'>
      <div onClick={toggleFullInfoVisibility}>
        {`${blog.title} by ${blog.author} `}
        <button>{showFullInfo ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className='fullInfo'>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a> <br />
        likes: {blog.likes} <button className='like-btn' onClick={likeBlog}>like</button> <br />
        {blog.user.name}
        <br />
        <button className='remove-btn' style={showRemoveButton} onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog