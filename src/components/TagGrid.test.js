import { render, fireEvent, act } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import TagGrid from './TagGrid';

const fireArrowDown = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowDown', code: 'ArrowDown' });
};

const fireArrowUp = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowUp', code: 'ArrowUp' });
};

const fireArrowRight = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowRight', code: 'ArrowRight' });
};

const fireArrowLeft = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowLeft', code: 'ArrowLeft' });
};

const tagContainer = (domNode) => {
    return domNode.closest('[data-testid="tag-container"]');
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

        expect(tagContainer(getByText(expectedTagName))).toHaveFocus();
    });

    test('three tabs: focus leaves the component', () => {
        const { container } = render(TagGrid, { tags });

        userEvent.tab();
        userEvent.tab();
        userEvent.tab();

        expect(container).toHaveFocus();
    });

    test('on one tab: focus leaves the component after a tag has been focused by other means', async () => {
        const { getByText, container } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Study Philosophy')).focus());

        userEvent.tab();

        expect(container).toHaveFocus();
    });
});

describe('on shift+tab press', () => {
    test('on one shift+tab: focuses on the container after a tag has been focused by other means', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Study Philosophy')).focus());

        userEvent.tab({ shift: true });

        expect(getByTestId('container')).toHaveFocus();
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

    test('focus moves to the next appropriate tag after the one that was focused by other means', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Study Philosophy')).focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(tagContainer(getByText('Reading List'))).toHaveFocus();
    });

    test('focus moves down a column of tags', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Youtube')).focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(tagContainer(getByText('Study Philosophy'))).toHaveFocus();
        await fireArrowDown(target);
        expect(tagContainer(getByText('Reading List'))).toHaveFocus();
    });

    test('focus cycles back to the top of a column of tags after moving past lowest tag', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Youtube')).focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(tagContainer(getByText('Study Philosophy'))).toHaveFocus();
        await fireArrowDown(target);
        expect(tagContainer(getByText('Reading List'))).toHaveFocus();
        await fireArrowDown(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus cycles back to the top of a column of tags after moving past lowest tag when empty rows exist at the end', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6),
            minRows: 4,
        });
        await act(() => tagContainer(getByText('Youtube')).focus());
        const target = getByTestId('container');

        await fireArrowDown(target);
        expect(tagContainer(getByText('Study Philosophy'))).toHaveFocus();
        await fireArrowDown(target);
        expect(tagContainer(getByText('Reading List'))).toHaveFocus();
        await fireArrowDown(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });
});

describe('on up arrow press', () => {
    test('focus stays on the container when focus was on the container', async () => {
        const { getByTestId } = render(TagGrid, { tags });
        const target = getByTestId('container');
        await act(() => target.focus());

        await fireArrowUp(target);

        expect(target).toHaveFocus();
    });

    test('focus moves to the next appropriate tag after the one that was focused by other means', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Study Philosophy')).focus());
        const target = getByTestId('container');

        await fireArrowUp(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus moves up a column of tags', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Reading List')).focus());
        const target = getByTestId('container');

        await fireArrowUp(target);
        expect(tagContainer(getByText('Study Philosophy'))).toHaveFocus();
        await fireArrowUp(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus cycles back to the bottom of a column of tags after moving past highest tag', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Reading List')).focus());
        const target = getByTestId('container');

        await fireArrowUp(target);
        expect(tagContainer(getByText('Study Philosophy'))).toHaveFocus();
        await fireArrowUp(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
        await fireArrowUp(target);
        expect(tagContainer(getByText('Reading List'))).toHaveFocus();
    });
});

describe('on right arrow press', () => {
    test('focus stays on the container when focus was on the container', async () => {
        const { getByTestId } = render(TagGrid, { tags });
        const target = getByTestId('container');
        await act(() => target.focus());

        await fireArrowRight(target);

        expect(target).toHaveFocus();
    });

    test('focus moves to the next appropriate tag after the one that was focused by other means', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Coffee!')).focus());
        const target = getByTestId('container');

        await fireArrowRight(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus moves to the right in a row of tags', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Youtube')).focus());
        const target = getByTestId('container');

        await fireArrowRight(target);
        expect(tagContainer(getByText('Coffee!'))).toHaveFocus();
    });

    test('focus cycles back to the leftmost tag of a row after moving past rightmost tag', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Youtube')).focus());
        const target = getByTestId('container');

        await fireArrowRight(target);
        expect(tagContainer(getByText('Coffee!'))).toHaveFocus();
        await fireArrowRight(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });
});

describe('on left arrow press', () => {
    test('focus stays on the container when focus was on the container', async () => {
        const { getByTestId } = render(TagGrid, { tags });
        const target = getByTestId('container');
        await act(() => target.focus());

        await fireArrowLeft(target);

        expect(target).toHaveFocus();
    });

    test('focus moves to the next appropriate tag after the one that was focused by other means', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Coffee!')).focus());
        const target = getByTestId('container');

        await fireArrowLeft(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus moves to the left in a row of tags', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Coffee!')).focus());
        const target = getByTestId('container');

        await fireArrowLeft(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
    });

    test('focus cycles back to the rightmost tag of a row after moving past leftmost tag', async () => {
        const { getByText, getByTestId } = render(TagGrid, {
            tags: tags.slice(0, 6)
        });
        await act(() => tagContainer(getByText('Coffee!')).focus());
        const target = getByTestId('container');

        await fireArrowLeft(target);
        expect(tagContainer(getByText('Youtube'))).toHaveFocus();
        await fireArrowLeft(target);
        expect(tagContainer(getByText('Coffee!'))).toHaveFocus();
    });
});
