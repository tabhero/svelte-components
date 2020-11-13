import { render, fireEvent, act } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import TagGrid from './TagGrid';

const fireArrowDown = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowDown', code: 'ArrowDown' });
};

const tags = [
    { id: 'xyz', added: true, name: 'Youtube' },
    { id: 'xyz', added: true, name: 'Coffee!' },
    { id: 'xyz', added: true, name: 'Study Philosophy' },
    { id: 'xyz', added: false, name: 'Events' },
    { id: 'xyz', added: false, name: 'Reading List' },
    { id: 'xyz', added: false, name: 'Medium' },
];

describe('on tab press', () => {
    test('one tab: focuses on the tag grid', () => {
        const { getByTestId } = render(TagGrid, { tags });

        userEvent.tab();

        expect(getByTestId('container')).toHaveFocus();
    });

    test('two tabs: focuses on the first tag', () => {
        const { getByText } = render(TagGrid, { tags });
        const expectedTagName = tags[0].name;

        userEvent.tab();
        userEvent.tab();

        expect(getByText(expectedTagName).closest('[data-testid="tag-container"]')).toHaveFocus();
    });

    test('three tabs: focus leaves the component', () => {
        const { container } = render(TagGrid, { tags });

        userEvent.tab();
        userEvent.tab();
        userEvent.tab();

        expect(container).toHaveFocus();
    });
});

describe('on down arrow press', () => {
    test('focus stays on the container when focus was on the container', async () => {
        const { getByTestId } = render(TagGrid, { tags });
        const target = getByTestId('container');
        await act(() => target.focus());

        await fireArrowDown(target);

        expect(target).toHaveFocus();
    });

    test('focus moves down a column of tags', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => getByText('Youtube').closest('[data-testid="tag-container"]').focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(getByText('Study Philosophy').closest('[data-testid="tag-container"]')).toHaveFocus();
        await fireArrowDown(target);
        expect(getByText('Reading List').closest('[data-testid="tag-container"]')).toHaveFocus();
    });

    test('focus cycles back to the top of a column of tags after moving past lowest tag', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => getByText('Youtube').closest('[data-testid="tag-container"]').focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(getByText('Study Philosophy').closest('[data-testid="tag-container"]')).toHaveFocus();
        await fireArrowDown(target);
        expect(getByText('Reading List').closest('[data-testid="tag-container"]')).toHaveFocus();
        await fireArrowDown(target);
        expect(getByText('Youtube').closest('[data-testid="tag-container"]')).toHaveFocus();
    });
});
