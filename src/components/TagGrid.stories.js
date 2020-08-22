import { action } from '@storybook/addon-actions';

import TagGrid from './TagGrid.svelte';

export default {
    title: 'TagGrid',
    component: TagGrid,
};

const tags = [
    { id: 'xyz', added: true, name: 'Youtube' },
    { id: 'xyz', added: true, name: 'Coffee!' },
    { id: 'xyz', added: true, name: 'Study Philosophy' },
    { id: 'xyz', added: false, name: 'Events' },
    { id: 'xyz', added: false, name: 'Reading List' },
    { id: 'xyz', added: false, name: 'Medium' },
];

export const AllCellsFilled = () => ({
    Component: TagGrid,
    props: {
        tags: [...tags, ...tags]
    },
    on: { tagClick: action('tagClicked') }
});

export const EmptyCellsAndRows = () => ({
    Component: TagGrid,
    props: {
        minRows: 4,
        tags: tags.slice(0, 3)
    },
    on: { tagClick: action('tagClicked') }
});
