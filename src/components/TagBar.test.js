import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import TagBar from './TagBar';
import { ADD_TAG_INPUT_MAX_LENGTH } from '../constants';

/**
 * Notes:
 * - keyDown vs keyPress:
 *   - https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
 */

const fireArrowDown = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowDown', code: 'ArrowDown' });
};
const fireArrowUp = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowUp', code: 'ArrowUp' });
};

const placeholder = 'Search from your tag library or create a new tag!';
const prompt = '+Create New Tag and Add';
const maxInputLength = ADD_TAG_INPUT_MAX_LENGTH;

describe('on render', () => {
    test('has an input element with the proper placeholder', () => {
        const { getByPlaceholderText } = render(TagBar, {});

        expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
});

describe('on tab', () => {
    test('has an input element that gets focused on pressing TAB', () => {
        const { getByPlaceholderText } = render(TagBar, {});

        userEvent.tab();

        expect(getByPlaceholderText(placeholder)).toHaveFocus();
    });
});

describe('on down arrow', () => {
    test('focuses on the prompt on pressing down arrow when no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowDown(target);

        expect(getByText(prompt).closest('li')).toHaveFocus();
    });

    test('focuses on the prompt on down arrow when no exact match and some suggestion had been focused on before', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'abc', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        // arrange
        await fireArrowDown(target);  // focus on prompt
        await fireArrowDown(target);  // focus on first suggestion
        getByPlaceholderText(placeholder).focus();  // re-focus on the input

        // act
        await fireArrowDown(target);

        expect(getByText(prompt).closest('li')).toHaveFocus();
    });

    test('focuses on the matched suggestion on pressing down arrow when exact match present', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'one',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowDown(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('focuses on the matched suggestion on down arrow when exact match present and it had been focused on before', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = render(TagBar, {
            input: 'one',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        // arrange
        await fireArrowDown(target);
        getByPlaceholderText(placeholder).focus();  // re-focus on the input after having focused on the exact match

        // act
        await fireArrowDown(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('focuses on the prompt on down arrow when some input but no suggestions present', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: []
        });
        const target = getByTestId('container');

        await fireArrowDown(target);

        expect(getByText(prompt).closest('li')).toHaveFocus();
    });

    test('focuses on the first suggestion on pressing two down arrows when no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowDown(target);
        await fireArrowDown(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('wraps the focus around to the prompt when arrow press down goes past the last suggestion and no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowDown(target);
        await fireArrowDown(target);
        await fireArrowDown(target);

        expect(getByText(prompt).closest('li')).toHaveFocus();
    });

    test('keeps focus on the input element on arrow down when no input and hence no suggestions/prompt present', async () => {
        const { getByTestId, getByPlaceholderText } = render(TagBar, {});
        getByPlaceholderText(placeholder).focus();
        const target = getByTestId('container');

        // act
        await fireArrowDown(target);

        expect(getByPlaceholderText(placeholder)).toHaveFocus();
    });

    test('keeps focus on the input element on arrow down when input exceeds max allowed length', async () => {
        const { getByTestId, getByPlaceholderText } = render(TagBar, {
            input: Array(maxInputLength + 1).fill('c').join('')
        });
        getByPlaceholderText(placeholder).focus();
        const target = getByTestId('container');

        // act
        await fireArrowDown(target);

        expect(getByPlaceholderText(placeholder)).toHaveFocus();
    });
});

describe('on up arrow', () => {
    test('focuses on the last suggestion on pressing up arrow when no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'abc', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowUp(target);

        expect(getByText('two').closest('li')).toHaveFocus();
    });

    test('focuses on the last suggestion on up arrow when no exact match and some suggestion had been focused on before', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'abc', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        // arrange
        await fireArrowDown(target);  // focus on prompt
        await fireArrowDown(target);  // focus on first suggestion
        getByPlaceholderText(placeholder).focus();  // re-focus on the input

        // act
        await fireArrowUp(target);

        expect(getByText('two').closest('li')).toHaveFocus();
    });

    test('focuses on the matched suggestion on pressing up arrow when exact match present', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'one',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowUp(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('focuses on the matched suggestion on up arrow when exact match present and it had been focused on before', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = render(TagBar, {
            input: 'one',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' }
            ]
        });
        const target = getByTestId('container');

        // arrange
        await fireArrowDown(target);
        getByPlaceholderText(placeholder).focus();  // re-focus on the input after having focused on the exact match

        // act
        await fireArrowUp(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('focuses on the prompt on up arrow when some input but no suggestions present', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: []
        });
        const target = getByTestId('container');

        await fireArrowUp(target);

        expect(getByText(prompt).closest('li')).toHaveFocus();
    });

    test('focuses on the second last suggestion on pressing two up arrows when no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'abc', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowUp(target);
        await fireArrowUp(target);

        expect(getByText('one').closest('li')).toHaveFocus();
    });

    test('wraps the focus around to the last element when arrow up goes past the prompt suggestion and no exact match', async () => {
        const { getByTestId, getByText } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'xyz', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        await fireArrowUp(target);
        await fireArrowUp(target);
        await fireArrowUp(target);
        await fireArrowUp(target);

        expect(getByText('two').closest('li')).toHaveFocus();
    });

    test('keeps focus on the input element on arrow up when no input and hence no suggestions/prompt present', async () => {
        const { getByTestId, getByPlaceholderText } = render(TagBar, {});
        getByPlaceholderText(placeholder).focus();
        const target = getByTestId('container');

        // act
        await fireArrowUp(target);

        expect(getByPlaceholderText(placeholder)).toHaveFocus();
    });

    test('keeps focus on the input element on arrow up when input exceeds max allowed length', async () => {
        const { getByTestId, getByPlaceholderText } = render(TagBar, {
            input: Array(maxInputLength + 1).fill('c').join('')
        });
        getByPlaceholderText(placeholder).focus();
        const target = getByTestId('container');

        // act
        await fireArrowUp(target);

        expect(getByPlaceholderText(placeholder)).toHaveFocus();
    });
});

describe('on updating the suggestions prop', () => {
    test.skip('re-focuses on the new last suggestion on losing the last suggestion that was previously focused on when no exact match', async () => {
        const { getByTestId, getByText, rerender } = render(TagBar, {
            input: 'something',
            suggestions: [
                { id: 'xyz', added: false, name: 'one' },
                { id: 'abc', added: false, name: 'two' }
            ]
        });
        const target = getByTestId('container');

        // arrange
        await fireArrowDown(target);  // focus on prompt
        await fireArrowDown(target);  // focus on first suggestion
        await fireArrowDown(target);  // focus on last suggestion

        // act
        rerender({
            props: {
                input: 'something',
                suggestions: [
                    { id: 'xyz', added: false, name: 'one' }
                ]
            }
        });

        expect(getByText('one').closest('li')).toHaveFocus();
    });
});
