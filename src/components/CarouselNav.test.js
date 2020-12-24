import { act, render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import CarouselNav from './CarouselNav.svelte';

const fireArrowRight = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowRight', code: 'ArrowRight' });
};

const fireArrowLeft = (domNode) => {
    return fireEvent.keyDown(domNode, { key: 'ArrowLeft', code: 'ArrowLeft' });
};

describe('on render', () => {
    test('when multiple pages but no page index is given, sets the first page as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 2
        });
        expect(getByLabelText('Page 1')).toHaveClass('current');
    });

    test('when multiple pages, sets the page of the given page index as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 5,
            currentIndex: 3
        });
        expect(getByLabelText('Page 4')).toHaveClass('current');
    });

    test('when given page index is left-out-of-bound: sets the first page as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 5,
            currentIndex: -1
        });
        expect(getByLabelText('Page 1')).toHaveClass('current');
    });

    test('when given page index is right-out-of-bound: sets the last page as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 5,
            currentIndex: 5
        });
        expect(getByLabelText('Page 5')).toHaveClass('current');
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

    test('one tab: focus on the right button if a page has been focused by other means', async () => {
        const { getAllByRole, getByLabelText } = render(CarouselNav, {
            numPages: 3
        });
        await act(() => getByLabelText('Page 2').focus());

        userEvent.tab();

        expect(getAllByRole('button')[1]).toHaveFocus();
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

    test('four tabs: focus leaves the component', () => {
        const { container } = render(CarouselNav, {
            numPages: 2
        });

        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();

        expect(container).toHaveFocus();
    });
});

describe('on right arrow', () => {
    test('focuses on the page after the currently focused one', async () => {
        const { getByLabelText, getByTestId } = render(CarouselNav, {
            numPages: 3
        });
        const pageNav = getByTestId('page-nav');
        await act(() => getByLabelText('Page 2').focus());

        await fireArrowRight(pageNav);

        expect(getByLabelText('Page 3')).toHaveFocus();
    });

    test('wraps the focus to the first page if last page was focused', async () => {
        const { getByLabelText, getByTestId } = render(CarouselNav, {
            numPages: 3
        });
        const pageNav = getByTestId('page-nav');
        await act(() => getByLabelText('Page 3').focus());

        await fireArrowRight(pageNav);

        expect(getByLabelText('Page 1')).toHaveFocus();
    });
});

describe('on left arrow', () => {
    test('focuses on the page pervious to the currently focused one', async () => {
        const { getByLabelText, getByTestId } = render(CarouselNav, {
            numPages: 3
        });
        const pageNav = getByTestId('page-nav');
        await act(() => getByLabelText('Page 2').focus());

        await fireArrowLeft(pageNav);

        expect(getByLabelText('Page 1')).toHaveFocus();
    });

    test('wraps the focus to the last page if first page was focused', async () => {
        const { getByLabelText, getByTestId } = render(CarouselNav, {
            numPages: 3
        });
        const pageNav = getByTestId('page-nav');
        await act(() => getByLabelText('Page 1').focus());

        await fireArrowLeft(pageNav);

        expect(getByLabelText('Page 3')).toHaveFocus();
    });
});
