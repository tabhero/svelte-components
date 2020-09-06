import Heading from './Heading.storywrap.svelte';

export default {
    title: 'Heading',
    component: Heading,
};

export const Default = () => ({
    Component: Heading,
    props: {
        slot: 'This Is A Heading'
    },
});

export const NoContent = () => ({
    Component: Heading,
    props: {},
});
