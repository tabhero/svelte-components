import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import TagGrid from './TagGrid';

const tags = [
    { id: 'xyz', added: true, name: 'Youtube' },
    { id: 'xyz', added: true, name: 'Coffee!' },
    { id: 'xyz', added: true, name: 'Study Philosophy' },
    { id: 'xyz', added: false, name: 'Events' },
    { id: 'xyz', added: false, name: 'Reading List' },
    { id: 'xyz', added: false, name: 'Medium' },
];

describe('roving tabindex', () => {
    test('on tab press: focuses on the tag grid', () => {
        const { getByTestId } = render(TagGrid, { tags });

        userEvent.tab();

        expect(getByTestId('container')).toHaveFocus();
    });

    test('on two tab presses: focuses on the first tag', () => {
        const { getByText } = render(TagGrid, { tags });
        const expectedTagName = tags[0].name;

        userEvent.tab();
        userEvent.tab();

        expect(getByText(expectedTagName).closest('.container')).toHaveFocus();
    });

    test('on three tab presses: focus leaves the component', () => {
        const { container } = render(TagGrid, { tags });

        userEvent.tab();
        userEvent.tab();
        userEvent.tab();

        expect(container).toHaveFocus();
    });
});

