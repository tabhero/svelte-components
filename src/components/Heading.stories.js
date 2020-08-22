import Heading from './Heading.svelte';

export default {
    title: 'Heading',
    component: Heading,
};

export const Default = () => ({
    Component: Heading,
    props: {
        text: 'This Is A Heading'
    },
});
