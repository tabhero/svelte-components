import { render, fireEvent } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import TagBar from './TagBar'

/**
 * Notes:
 * - keyDown vs keyPress:
 *   - https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
 */

const fireArrowDown = (domNode) => {
  return fireEvent.keyDown(domNode, { key: 'ArrowDown', code: 'ArrowDown' })
}
const fireArrowUp = (domNode) => {
  return fireEvent.keyDown(domNode, { key: 'ArrowUp', code: 'ArrowUp' })
}

const placeholder = 'Search from your tag library or create a new tag!'

describe('on render', () => {
  test('has an input element with the proper placeholder', () => {
    const { getByPlaceholderText } = render(TagBar, {})

    expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
  })
})

describe('on tab', () => {
  test('has an input element that gets focused on pressing TAB', () => {
    const { getByPlaceholderText } = render(TagBar, {})

    userEvent.tab()

    expect(getByPlaceholderText(placeholder)).toHaveFocus()
  })
})

describe('on down arrow', () => {
  test('focuses on the prompt on pressing down arrow when no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowDown(target)

    expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
  })

  test('focuses on the matched suggestion on pressing down arrow when exact match present', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'one',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowDown(target)

    expect(getByText('one').closest('li')).toHaveFocus()
  })

  test('focuses on the prompt on down arrow when some input but no suggestions present', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: []
    })
    const target = getByTestId('container')

    await fireArrowDown(target)

    expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
  })

  test('focuses on the first suggestion on pressing two down arrows when no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowDown(target)
    await fireArrowDown(target)

    expect(getByText('one').closest('li')).toHaveFocus()
  })

  test('wraps the focus around to the prompt when arrow press down goes past the last suggestion and no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowDown(target)
    await fireArrowDown(target)
    await fireArrowDown(target)

    expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
  })

  test('keeps focus on the input element on arrow down when no input and hence no suggestions/prompt present', async () => {
    const { getByTestId, getByPlaceholderText } = render(TagBar, {})
    getByPlaceholderText(placeholder).focus()
    const target = getByTestId('container')

    // act
    await fireArrowDown(target)

    expect(getByPlaceholderText(placeholder)).toHaveFocus()
  })
})

describe('on up arrow', () => {
  test('focuses on the last suggestion on pressing up arrow when no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' },
        { id: 'abc', added: false, name: 'two' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowUp(target)

    expect(getByText('two').closest('li')).toHaveFocus()
  })

  test('focuses on the matched suggestion on pressing up arrow when exact match present', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'one',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowUp(target)

    expect(getByText('one').closest('li')).toHaveFocus()
  })

  test('focuses on the prompt on up arrow when some input but no suggestions present', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: []
    })
    const target = getByTestId('container')

    await fireArrowUp(target)

    expect(getByText('+Create New Tag and Add').closest('li')).toHaveFocus()
  })

  test('focuses on the second last suggestion on pressing two up arrows when no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' },
        { id: 'abc', added: false, name: 'two' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowUp(target)
    await fireArrowUp(target)

    expect(getByText('one').closest('li')).toHaveFocus()
  })

  test('wraps the focus around to the last element when arrow up goes past the prompt suggestion and no exact match', async () => {
    const { getByTestId, getByText } = render(TagBar, {
      input: 'something',
      suggestions: [
        { id: 'xyz', added: false, name: 'one' },
        { id: 'xyz', added: false, name: 'two' }
      ]
    })
    const target = getByTestId('container')

    await fireArrowUp(target)
    await fireArrowUp(target)
    await fireArrowUp(target)
    await fireArrowUp(target)

    expect(getByText('two').closest('li')).toHaveFocus()
  })

  test('keeps focus on the input element on arrow up when no input and hence no suggestions/prompt present', async () => {
    const { getByTestId, getByPlaceholderText } = render(TagBar, {})
    getByPlaceholderText(placeholder).focus()
    const target = getByTestId('container')

    // act
    await fireArrowUp(target)

    expect(getByPlaceholderText(placeholder)).toHaveFocus()
  })
})
