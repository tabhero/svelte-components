import Icon from './Icon.svelte';

export default {
    title: 'Icon',
    component: Icon,
};

export const Close = () => ({
    Component: Icon,
    props: {
        icon: 'close',
        fill: '#000'
    },
});

export const Share = () => ({
    Component: Icon,
    props: {
        icon: 'share',
        fill: '#000'
    },
});

export const UnknownIcon = () => ({
    Component: Icon,
    props: {
        icon: null,
        fill: '#000'
    },
});
