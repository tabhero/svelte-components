import { action } from '@storybook/addon-actions';

import NavLink from './NavLink.storywrap.svelte';

export default {
    title: 'NavLink',
    component: NavLink,
};

export const Default = () => ({
    Component: NavLink,
    props: {
        slot: 'Some Text Content'
    },
    on: { click: action('click') }
});

export const NoContent = () => ({
    Component: NavLink,
    props: {},
    on: { click: action('click') }
});
