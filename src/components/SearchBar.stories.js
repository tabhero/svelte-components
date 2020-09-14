import SearchBar from './SearchBar.svelte';

export default {
    title: 'SearchBar',
    component: SearchBar,
};

export const NoValue = () => ({
    Component: SearchBar,
    props: {
        value: '',
        placeholder: 'This is placeholder'
    }
});

export const SomeValue = () => ({
    Component: SearchBar,
    props: {
        value: 'This is some value',
    }
});
