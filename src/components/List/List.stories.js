import { action } from '@storybook/addon-actions';

import List from './List.wrap.svelte';

import Collection from '../Collection.svelte';

export default {
    title: 'List',
    component: List,
};

export const ListOfCollections = () => ({
    Component: List,
    props: {
        items: [
            { id: '1', name: 'Coffee Brewing', numTabs: 12, createdAt: new Date() },
            { id: '2', name: 'Pending Reads', numTabs: 34, createdAt: new Date() },
            { id: '3', name: 'The Other Pending Reads', numTabs: 56, createdAt: new Date() },
        ],
        slot: Collection
    },
    on: { clickItem: action('clickItem') }
});

