import { render, fireEvent } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import TagBar from './TagBar'

/**
 * Notes:
 * - keyDown vs keyPress:
 *   - https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
 */

 const fireKeydown = (domNode) => {
   return fireEvent.keyDown(domNode, { key: 'ArrowDown', code: 'ArrowDown' })
 }

test('has an input element with the proper placeholder', () => {
  const placeholder = 'Search from your tag library or create a new tag!'

  const { getByPlaceholderText } = render(TagBar, {})

  expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})

test('has an input element that gets focused on pressing TAB', () => {
  const placeholder = 'Search from your tag library or create a new tag!'

  const { getByPlaceholderText } = render(TagBar, {})

  userEvent.tab()

  expect(getByPlaceholderText(placeholder)).toHaveFocus()
})

test('focuses on the prompt when no exact match on pressing TAB followed by down arrow', async () => {
  const { getByTestId, getByText } = render(TagBar, {
    input: 'something',
    suggestions: [
      { id: 'xyz', added: false, name: 'one' }
    ]
  })

  userEvent.tab()
  fireKeydown(getByTestId('container'))

  expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
})

test('focuses on the first suggestion when no exact match on pressing TAB followed by two down arrows', async () => {
  const { getByTestId, getByText } = render(TagBar, {
    input: 'something',
    suggestions: [
      { id: 'xyz', added: false, name: 'one' }
    ]
  })

  userEvent.tab()
  fireKeydown(getByTestId('container'))
  fireKeydown(getByTestId('container'))

  expect(getByText('one').closest('li')).toHaveFocus()
})
