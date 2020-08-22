import Info from './Info.svelte';

export default {
    title: 'Info',
    component: Info,
};

export const MediumFontSize = () => ({
    Component: Info,
    props: {
        content: [
            [false, 'This is'],
            [true, 'some bold piece'],
            [false, 'of text'],
            [true, 'like BOLD'],
            [true, 'and here too'],
        ]
    },
});

export const SmallFontSize = () => ({
    Component: Info,
    props: {
        fontSize: 'small',
        content: [
            [false, 'This is'],
            [true, 'some bold piece'],
            [false, 'of text'],
            [true, 'like BOLD'],
            [true, 'and here too'],
        ]
    },
});
