import { action } from '@storybook/addon-actions';

import CheckList from './CheckList.wrap.svelte';

import Collection from '../Collection.svelte';
import Link from '../Link.svelte';
import Tag from '../Tag.svelte';

export default {
    title: 'CheckList',
    component: CheckList,
};

export const CheckListOfCollections = () => ({
    Component: CheckList,
    props: {
        name: 'collections-checklist',
        items: [
            { id: '1', checked: true, name: 'Coffee Brewing', numTabs: 12, createdAt: new Date() },
            { id: '2', checked: false, name: 'Pending Reads', numTabs: 34, createdAt: new Date() },
            { id: '3', checked: true, name: 'The Other Pending Reads', numTabs: 56, createdAt: new Date() },
        ],
        slot: Collection
    },
    on: { clickItem: action('clickItem') }
});

const links = [{
    id: '1',
    checked: false,
    title: 'avajs/ava: Node.js test runner that lets you develop with confidence 🚀',
    url: 'https://github.com/avajs/ava',
    faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg'
}, {
    id: '2',
    checked: true,
    title: 'Making The Subway Meatball Sub At Home | But Better - YouTube',
    url: 'https://www.youtube.com/watch?v=3Abk2WWuoao',
    faviconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png'
}, {
    id: '3',
    checked: true,
    title: 'Second Crusade - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Second_Crusade',
    faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
}, {
    id: '4',
    checked: false,
    title: 'Taking Hash Tables Off The Shelf. Truth time: learning about theoretical… | by Vaidehi Joshi | basecs | Medium',
    url: 'https://medium.com/basecs/taking-hash-tables-off-the-shelf-139cbf4752f0',
    faviconUrl: 'https://medium.com/favicon.ico'
}];

export const CheckListOfLinks = () => ({
    Component: CheckList,
    props: {
        name: 'links-checklist',
        items: links,
        slot: Link
    },
    on: { clickItem: action('clickItem') }
});

const tags = [
    { id: '1', checked: true, added: true, name: 'Youtube' },
    { id: '2', checked: false, added: true, name: 'Coffee!' },
    { id: '3', checked: true, added: true, name: 'Study Philosophy' },
    { id: '4', checked: false, added: false, name: 'Events' },
    { id: '5', checked: false, added: false, name: 'Reading List' },
    { id: '6', checked: true, added: false, name: 'Medium' },
];

export const CheckListOfTags = () => ({
    Component: CheckList,
    props: {
        name: 'tags-checklist',
        items: tags,
        slot: Tag
    },
    on: { clickItem: action('clickItem') }
});
