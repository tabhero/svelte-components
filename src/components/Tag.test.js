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

test('has added class when added is passed as true', () => {
  const { getByText } = render(Tag, { name: 'Some tag name', added: true })

  expect(getByText('Some tag name')).toHaveClass('added')
})
