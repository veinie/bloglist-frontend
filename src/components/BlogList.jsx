import { useState } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs, like, user, remove }) => {
  const [showMostLikedFirst, setShowMostLikedFirst] = useState(true)

  const mostLikedSorter = (a, b) => b.likes - a.likes
  const leastLikedSorter = (a, b) => a.likes - b.likes

  const customSorter = showMostLikedFirst
    ? mostLikedSorter
    : leastLikedSorter

  const toggleSorter = () => {
    setShowMostLikedFirst(!showMostLikedFirst)
  }

  return (
    <div id="blogslist">
      <h2>blogs</h2>
      <button onClick={toggleSorter}>
        {showMostLikedFirst
          ? 'Show least liked firs'
          : 'Show most liked first'
        }
      </button>
      {blogs.sort(customSorter).map(blog =>
        <Blog key={blog.id} blog={blog} like={like} user={user} remove={remove}/>
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  like: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default BlogList