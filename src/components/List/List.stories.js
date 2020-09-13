import { action } from '@storybook/addon-actions';

import List from './List.wrap.svelte';

import Collection from '../Collection.svelte';
import Link from '../Link.svelte';

export default {
    title: 'List',
    component: List,
};

export const ListOfCollections = () => ({
    Component: List,
    props: {
        items: [
            { id: '1', name: 'Coffee Brewing', numTabs: 12, createdAt: new Date() },
            { id: '2', name: 'Pending Reads', numTabs: 34, createdAt: new Date() },
            { id: '3', name: 'The Other Pending Reads', numTabs: 56, createdAt: new Date() },
        ],
        slot: Collection
    },
    on: { clickItem: action('clickItem') }
});

const links = [{
    id: '1',
    title: 'avajs/ava: Node.js test runner that lets you develop with confidence 🚀',
    url: 'https://github.com/avajs/ava',
    faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg'
}, {
    id: '2',
    title: 'Making The Subway Meatball Sub At Home | But Better - YouTube',
    url: 'https://www.youtube.com/watch?v=3Abk2WWuoao',
    faviconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png'
}, {
    id: '3',
    title: 'Second Crusade - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Second_Crusade',
    faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
}, {
    id: '4',
    title: 'Taking Hash Tables Off The Shelf. Truth time: learning about theoretical… | by Vaidehi Joshi | basecs | Medium',
    url: 'https://medium.com/basecs/taking-hash-tables-off-the-shelf-139cbf4752f0',
    faviconUrl: 'https://medium.com/favicon.ico'
}];

export const ListOfLinks = () => ({
    Component: List,
    props: {
        items: links,
        slot: Link
    },
    on: { clickItem: action('clickItem') }
});
