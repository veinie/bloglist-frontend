import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container
let sharedContext = {
  likeMockHandler: jest.fn()
}

beforeEach(() => {
  sharedContext.likeMockHandler.mockClear()
  const user = {
    username: 'Test User',
    name: 'Test User Name'
  }

  const blogObject = {
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'Test Blog Url',
    likes: 'Test Blog likes',
    user: user
  }

  container = render(
    <Blog blog={blogObject} user={user} like={sharedContext.likeMockHandler}/>
  ).container
})

test('renders content', () => {
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Test Blog Title')
  expect(div).toHaveTextContent('Test Blog Author')
  expect(div).toHaveTextContent('Test Blog Url')
  expect(div).toHaveTextContent('Test Blog likes')
})

test('url and author are not visible initially', () => {
  const div = container.querySelector('.fullInfo')
  expect(div).toHaveStyle('display: none')
})


test('url and author are shown when show is selected', async () => {
  const div = container.querySelector('.fullInfo')
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  expect(div).not.toHaveStyle('display: none')
})

test('clicking "like" twice creates two calls to that callback function', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(sharedContext.likeMockHandler.mock.calls).toHaveLength(2)
})