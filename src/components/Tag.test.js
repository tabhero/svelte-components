import { render } from '@testing-library/svelte'

import Tag from './Tag'

test('shows proper text when rendered', () => {
  const { getByText } = render(Tag, { name: 'Some tag name' })

  expect(getByText('Some tag name')).toBeInTheDocument()
})

test('does not have added class when added is not passed', () => {
  const { getByText } = render(Tag, { name: 'Some tag name' })

  expect(getByText('Some tag name')).not.toHaveClass('added')
})
