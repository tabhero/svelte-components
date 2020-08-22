import { action } from '@storybook/addon-actions';

import TagPages from './TagPages.svelte';

export default {
    title: 'TagPages',
    component: TagPages,
};

const tags = [
    { id: 'xyz', added: true, name: 'Youtube' },
    { id: 'xyz', added: true, name: 'Coffee!' },
    { id: 'xyz', added: true, name: 'Study Philosophy' },
    { id: 'xyz', added: false, name: 'Events' },
    { id: 'xyz', added: false, name: 'Reading List' },
    { id: 'xyz', added: false, name: 'Medium' },
    { id: 'xyz', added: false, name: 'Design' },
    { id: 'xyz', added: false, name: 'On The Road' },
    { id: 'xyz', added: true, name: 'Recipe' },
    { id: 'xyz', added: false, name: 'Want To Watch' },
    { id: 'xyz', added: true, name: 'Docs' },
];

export const OnePage = () => ({
    Component: TagPages,
    props: {
        tags: tags.slice(0, 6)
    },
    on: { tagClick: action('tagClicked') }
});

export const ManyPages = () => ({
    Component: TagPages,
    props: {
        tags: [...tags, ...tags]
    },
    on: { tagClick: action('tagClicked') }
});

export const EmptyRowsOnLastPage = () => ({
    Component: TagPages,
    props: {
        tags: tags.slice(0, 8)
    },
    on: { tagClick: action('tagClicked') }
});

export const NoTags = () => ({
    Component: TagPages,
    props: {
        tags: []
    },
    on: { tagClick: action('tagClicked') }
});
