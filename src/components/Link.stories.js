import Link from './Link.svelte';

export default {
    title: 'Link',
    component: Link,
};

export const PNGIcon = () => ({
    Component: Link,
    props: {
        title: 'Making The Subway Meatball Sub At Home | But Better - YouTube',
        url: 'https://www.youtube.com/watch?v=3Abk2WWuoao',
        faviconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png',
    },
});

export const PNGLargeIcon = () => ({
    Component: Link,
    props: {
        title: 'Making The Subway Meatball Sub At Home | But Better - YouTube',
        url: 'https://www.youtube.com/watch?v=3Abk2WWuoao',
        faviconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png',
        faviconSize: 64,
    },
});

export const SVGIcon = () => ({
    Component: Link,
    props: {
        title: 'avajs/ava: Node.js test runner that lets you develop with confidence 🚀',
        url: 'https://github.com/avajs/ava',
        faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
    },
});

export const SVGLargeIcon = () => ({
    Component: Link,
    props: {
        title: 'avajs/ava: Node.js test runner that lets you develop with confidence 🚀',
        url: 'https://github.com/avajs/ava',
        faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
        faviconSize: 64,
    },
});

export const ICOIcon = () => ({
    Component: Link,
    props: {
        title: 'Second Crusade - Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Second_Crusade',
        faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
    },
});

export const ICOLargeIcon = () => ({
    Component: Link,
    props: {
        title: 'Second Crusade - Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Second_Crusade',
        faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
        faviconSize: 64,
    },
});
