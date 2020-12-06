import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import CarouselNav from './CarouselNav.svelte';

describe('on render', () => {
    test('when multiple pages but no page index is given, sets the first page as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 2
        });
        expect(getByLabelText('Page 1')).toHaveClass('current');
    });
});

describe('on tab press', () => {
    test('one tab: focus on the left button', () => {
        const { getAllByRole } = render(CarouselNav, {
            numPages: 2
        });

        userEvent.tab();

        expect(getAllByRole('button')[0]).toHaveFocus();
    });
});
