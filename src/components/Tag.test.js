import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Tag from './Tag';

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

describe('on tab press', () => {
    test('is not focused when tabindex not passed', () => {
        const { container } = render(Tag, { name: 'Some tag name' });

        userEvent.tab();

        expect(container).toHaveFocus();
    });

    test('is focused when tabindex of 0 is passed', () => {
        const { getByText } = render(Tag, { name: 'Some tag name', tabindex: 0 });

        userEvent.tab();

        expect(getByText('Some tag name').closest('.container')).toHaveFocus();
    });
});
