import { action } from '@storybook/addon-actions';

import Tag from './Tag.svelte';

export default {
    title: 'Tag',
    component: Tag,
};

export const AddedShort = () => ({
    Component: Tag,
    props: {
        name: 'Youtube',
        added: true,
    },
    on: { click: action('clicked') },
});

export const AddedLong = () => ({
    Component: Tag,
    props: {
        name: 'Study Philosophy',
        added: true,
    },
    on: { click: action('clicked') },
});

export const NotAddedShort = () => ({
    Component: Tag,
    props: {
        name: 'Youtube',
        added: false,
    },
    on: { click: action('clicked') },
});

export const NotAddedLong = () => ({
    Component: Tag,
    props: {
        name: 'Study Philosophy',
        added: false,
    },
    on: { click: action('clicked') },
});

export const InTabOrder = () => ({
    Component: Tag,
    props: {
        name: 'Study Philosophy',
        tabindex: 0
    },
    on: { click: action('clicked') },
});
