import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import TagBar from './TagBar'

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
