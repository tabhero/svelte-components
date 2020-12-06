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

    test('two tabs: focus on the first page if no page index is given', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 2
        });

        userEvent.tab();
        userEvent.tab();

        expect(getByLabelText('Page 1')).toHaveFocus();
    });

    test('two tabs: focus on the page of the given page index', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 5,
            currentIndex: 2
        });

        userEvent.tab();
        userEvent.tab();

        expect(getByLabelText('Page 3')).toHaveFocus();
    });

    test('three tabs: focus on the right button even if more than one page present', () => {
        const { getAllByRole } = render(CarouselNav, {
            numPages: 2
        });

        userEvent.tab();
        userEvent.tab();
        userEvent.tab();

        expect(getAllByRole('button')[1]).toHaveFocus();
    });
});
