import LinksList from './LinksList.svelte';

export default {
    title: 'LinksList',
    component: LinksList,
};

const links = [{
    title: 'avajs/ava: Node.js test runner that lets you develop with confidence 🚀',
    url: 'https://github.com/avajs/ava',
    faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg'
}, {
    title: 'Making The Subway Meatball Sub At Home | But Better - YouTube',
    url: 'https://www.youtube.com/watch?v=3Abk2WWuoao',
    faviconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png'
}, {
    title: 'Second Crusade - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Second_Crusade',
    faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
}, {
    title: 'Taking Hash Tables Off The Shelf. Truth time: learning about theoretical… | by Vaidehi Joshi | basecs | Medium',
    url: 'https://medium.com/basecs/taking-hash-tables-off-the-shelf-139cbf4752f0',
    faviconUrl: 'https://medium.com/favicon.ico'
}];

export const PngSvgIcoAndLongTitles = () => ({
    Component: LinksList,
    props: {
        links: links,
        faviconSize: 24
    }
});

export const LargeFaviconsVaryingAspectRatios = () => ({
    Component: LinksList,
    props: {
        links: links,
        faviconSize: 64
    }
});
