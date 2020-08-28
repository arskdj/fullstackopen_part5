import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import App from '../App'

test('renders content', () => {
  const blog = {
      title: 'test title',
      url: 'test url',
      author : 'test author'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )

})
