import { action } from '@storybook/addon-actions';

import ActionButton from './ActionButton.svelte';

export default {
    title: 'ActionButton',
    component: ActionButton,
};

export const DefaultAndClicked = () => ({
    Component: ActionButton,
    props: {
        text: 'Some Text Content'
    },
    on: { click: action('click') }
});
