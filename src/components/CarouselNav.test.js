import { render } from '@testing-library/svelte';

import CarouselNav from './CarouselNav.svelte';

describe('on render', () => {
    test('when multiple pages but no page index is given, sets the first page as current', () => {
        const { getByLabelText } = render(CarouselNav, {
            numPages: 2
        });
        expect(getByLabelText('Page 1')).toHaveClass('current');
    });
});
