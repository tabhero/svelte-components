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

 const placeholder = 'Search from your tag library or create a new tag!'

test('has an input element with the proper placeholder', () => {
  const { getByPlaceholderText } = render(TagBar, {})

  expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})

test('has an input element that gets focused on pressing TAB', () => {
  const { getByPlaceholderText } = render(TagBar, {})

  userEvent.tab()

  expect(getByPlaceholderText(placeholder)).toHaveFocus()
})

test('focuses on the prompt on pressing down arrow when no exact match', async () => {
  const { getByTestId, getByText } = render(TagBar, {
    input: 'something',
    suggestions: [
      { id: 'xyz', added: false, name: 'one' }
    ]
  })

  await fireKeydown(getByTestId('container'))

  expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
})

test('focuses on the first suggestion on pressing two down arrows when no exact match', async () => {
  const { getByTestId, getByText } = render(TagBar, {
    input: 'something',
    suggestions: [
      { id: 'xyz', added: false, name: 'one' }
    ]
  })

  await fireKeydown(getByTestId('container'))
  await fireKeydown(getByTestId('container'))

  expect(getByText('one').closest('li')).toHaveFocus()
})

test('wraps the focus around to the prompt when arrow press down goes past the last suggestion and no exact match', async () => {
  const { getByTestId, getByText } = render(TagBar, {
    input: 'something',
    suggestions: [
      { id: 'xyz', added: false, name: 'one' }
    ]
  })

  await fireKeydown(getByTestId('container'))
  await fireKeydown(getByTestId('container'))
  await fireKeydown(getByTestId('container'))

  expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
})

test('keeps focus on the input element on arrow down when no input and hence no suggestions present', async () => {
  const { getByTestId, getByPlaceholderText } = render(TagBar, {})
  getByPlaceholderText(placeholder).focus()

  // act
  await fireKeydown(getByTestId('container'))

  expect(getByPlaceholderText(placeholder)).toHaveFocus()
})
