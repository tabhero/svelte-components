import { action } from '@storybook/addon-actions';

import Collection from './Collection.svelte';

export default {
    title: 'Collection',
    component: Collection,
};

export const DefaultAndHover = () => ({
    Component: Collection,
    props: {
        name: 'Collection name',
        numTabs: 12,
        createdAt: new Date('2020-08-21T17:17:22.821Z')
    },
    on: { click: action('click') }
});
