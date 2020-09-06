import Info from './Info.svelte';

export default {
    title: 'Info',
    component: Info,
};

export const MediumFontSize = () => ({
    Component: Info,
    props: {
        content: [
            [false, 'ipsum nunc aliquet bibendum enim'],
            [true, 'ipsum nunc aliquet bibendum enim'],
            [false, 'ipsum nunc aliquet bibendum enim'],
            [true, 'ipsum nunc aliquet bibendum enim'],
            [false, 'ipsum nunc aliquet bibendum enim'],
        ]
    },
});

export const SmallFontSize = () => ({
    Component: Info,
    props: {
        fontSize: 'small',
        content: [
            [false, 'ipsum nunc aliquet bibendum enim'],
            [true, 'ipsum nunc aliquet bibendum enim'],
            [false, 'ipsum nunc aliquet bibendum enim'],
            [true, 'ipsum nunc aliquet bibendum enim'],
            [false, 'ipsum nunc aliquet bibendum enim'],
        ]
    },
});
