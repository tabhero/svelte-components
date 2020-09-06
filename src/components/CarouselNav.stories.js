import { action } from '@storybook/addon-actions';

import CarouselNav from './CarouselNav.svelte';

export default {
    title: 'CarouselNav',
    component: CarouselNav,
};

const eventHandlers = {
    clickRight: action('clickRight'),
    clickLeft: action('clickLeft'),
    clickPage: action('clickPage')
};

export const NoPages = () => ({
    Component: CarouselNav,
    props: {
        numPages: 0,
        currentIndex: 0
    },
    on: eventHandlers,
});

export const OnePage = () => ({
    Component: CarouselNav,
    props: {
        numPages: 1,
        currentIndex: 0
    },
    on: eventHandlers,
});

export const FewPages = () => ({
    Component: CarouselNav,
    props: {
        numPages: 5,
        currentIndex: 1
    },
    on: eventHandlers,
});

export const CurrentPageOutOfRangeLeft = () => ({
    Component: CarouselNav,
    props: {
        numPages: 5,
        currentIndex: -2
    },
    on: eventHandlers,
});

export const CurrentPageOutOfRangeRight = () => ({
    Component: CarouselNav,
    props: {
        numPages: 5,
        currentIndex: 5
    },
    on: eventHandlers,
});
