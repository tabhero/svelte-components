import { action } from '@storybook/addon-actions';

import SearchButton from './SearchButton.wrap.svelte';

export default {
    title: 'SearchButton',
    component: SearchButton,
};

export const Default = () => ({
    Component: SearchButton,
    props: {
        slot: 'Some Text Content',
    },
    on: { click: action('click') }
});

export const NoContent = () => ({
    Component: SearchButton,
    props: {},
    on: { click: action('click') }
});
