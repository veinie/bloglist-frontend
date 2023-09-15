import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogAddition = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={handleBlogAddition}>
      <h2>create new</h2>
      <div>
        title
        <input
          id="new-title"
          type="text"
          value={title}
          name="Title"
          required
          onChange={event => setTitle(event.target.value)}
          placeholder='add a title'
        />
      </div>
      <div>
        author
        <input
          id="new-author"
          type="text"
          value={author}
          name="Author"
          required
          onChange={event => setAuthor(event.target.value)}
          placeholder='blog author'
        />
      </div>
      <div>
        url
        <input
          id="new-url"
          type="text"
          value={url}
          name="Url"
          required
          onChange={event => setUrl(event.target.value)}
          placeholder='blog url'
        />
      </div>
      <button id="newblog-create-btn" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm