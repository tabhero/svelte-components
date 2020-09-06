import { action } from '@storybook/addon-actions';

import ActionButton from './ActionButton.storywrap.svelte';

export default {
    title: 'ActionButton',
    component: ActionButton,
};

export const DefaultAndClicked = () => ({
    Component: ActionButton,
    props: {
        slot: 'Some Text Content'
    },
    on: { click: action('click') }
});

export const NoContent = () => ({
    Component: ActionButton,
    props: {},
    on: { click: action('click') }
});
