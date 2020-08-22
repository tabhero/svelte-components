import Input from './Input.svelte';

export default {
    title: 'Input',
    component: Input,
};

export const NoValue = () => ({
    Component: Input,
    props: {
        value: '',
        placeholder: 'This is placeholder'
    }
});

export const SomeValue = () => ({
    Component: Input,
    props: {
        value: 'This is some value',
    }
});
