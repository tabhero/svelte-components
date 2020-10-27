import { render } from '@testing-library/svelte'

import Tag from './Tag'

test('shows proper text when rendered', () => {
  const { getByText } = render(Tag, { name: 'Some tag name' })

  expect(getByText('Some tag name')).toBeInTheDocument()
})
