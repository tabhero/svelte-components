import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Tag from './Tag';

describe('on render', () => {
    test('shows proper text when rendered', () => {
        const { getByText } = render(Tag, { name: 'Some tag name' });

        expect(getByText('Some tag name')).toBeInTheDocument();
    });

    test('does not have added class when added is not passed', () => {
        const { getByText } = render(Tag, { name: 'Some tag name' });

        expect(getByText('Some tag name')).not.toHaveClass('added');
    });

    test('has added class when added is passed as true', () => {
        const { getByText } = render(Tag, { name: 'Some tag name', added: true });

        expect(getByText('Some tag name')).toHaveClass('added');
    });

    test('does not have added class when added is passed as false', () => {
        const { getByText } = render(Tag, { name: 'Some tag name', added: false });

        expect(getByText('Some tag name')).not.toHaveClass('added');
    });

    test('tag has focus when rendered with intoFocus prop', () => {
        const { getByTestId } = render(Tag, {
            name: 'Some tag name',
            intoFocus: true
        });

        expect(getByTestId('tag-container')).toHaveFocus();
    });
});

describe('on tab press', () => {
    test('is not focused when tabindex -1 is passed', () => {
        const { container } = render(Tag, { name: 'Some tag name', tabindex: '-1' });

        userEvent.tab();

        expect(container).toHaveFocus();
    });

    test('is focused when tabindex is not passed', () => {
        const { getByText } = render(Tag, { name: 'Some tag name' });

        userEvent.tab();

        expect(getByText('Some tag name').closest('.container')).toHaveFocus();
    });
});
