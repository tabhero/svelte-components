import { render } from '@testing-library/svelte'

import TagBar from './TagBar'

test('has an input element with the proper placeholder', () => {
  const placeholder = 'Search from your tag library or create a new tag!'

  const { getByPlaceholderText } = render(TagBar, {})

  expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
})
