import Component from './Component.svelte';

import { action } from '@storybook/addon-actions';

export default {
    title: 'Component',
    component: Component,
};

export const DefaultAndClicked = () => ({
    Component: Component,
    props: {
        text: 'This is a svelte component!'
    },
    on: { 'text-click': action('click') }
});
