import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls addBlog() with proper values', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog}/>)

  const titleInput = screen.getByPlaceholderText('add a title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const addButton = screen.getByText('create')

  await user.type(titleInput, 'New Title')
  await user.type(authorInput, 'New Author')
  await user.type(urlInput, 'New url')
  await user.click(addButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].title).toBe('New Title')
  expect(addBlog.mock.calls[0][0].author).toBe('New Author')
  expect(addBlog.mock.calls[0][0].url).toBe('New url')
})