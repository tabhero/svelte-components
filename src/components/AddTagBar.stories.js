import { action } from '@storybook/addon-actions';

import AddTagBar from './AddTagBar.wrap.svelte';

import { ADD_TAG_INPUT_MAX_LENGTH } from '../constants';

export default {
    title: 'AddTagBar',
    component: AddTagBar,
};

const eventHandlers = {
    selectSuggestion: action('selectSuggestion'),
    selectNew: action('selectNew')
};

export const EmptyInput = () => ({
    Component: AddTagBar,
    props: {
        input: '',
        suggestions: [],
    },
    on: eventHandlers,
});

export const ManySuggestions = () => ({
    Component: AddTagBar,
    props: {
        input: 'G',
        suggestions: Array(10).fill({ id: 'xyz', added: false, name: 'Google' }),
    },
    on: eventHandlers,
});

export const FewSuggestions = () => ({
    Component: AddTagBar,
    props: {
        input: 'Go',
        suggestions: [
            { id: 'xyz', added: false, name: 'Goa' },
            { id: 'xyz', added: false, name: 'Google' }
        ],
    },
    on: eventHandlers,
});

export const SomeAddedSuggestions = () => ({
    Component: AddTagBar,
    props: {
        input: 'Go',
        suggestions: [
            { id: 'xyz', added: false, name: 'Goa' },
            { id: 'xyz', added: true, name: 'Google' },
            { id: 'xyz', added: true, name: 'Golang' }
        ],
    },
    on: eventHandlers,
});

export const ExactMatch = () => ({
    Component: AddTagBar,
    props: {
        input: 'Goa',
        suggestions: [{ id: 'xyz', added: false, name: 'Goa' }],
    },
    on: eventHandlers,
});

export const InputMaxLength = () => ({
    Component: AddTagBar,
    props: {
        input: Array(ADD_TAG_INPUT_MAX_LENGTH).fill('G').join(''),
        suggestions: [],
    },
    on: eventHandlers,
});

export const InputMaxLengthExceeded = () => ({
    Component: AddTagBar,
    props: {
        input: Array(ADD_TAG_INPUT_MAX_LENGTH + 1).fill('G').join(''),
        suggestions: [],
    },
    on: eventHandlers,
});

export const FloatWithManySuggestions = () => ({
    Component: AddTagBar,
    props: {
        input: 'G',
        suggestions: Array(10).fill({ id: 'xyz', added: false, name: 'Google' }),
        float: true,
    },
    on: eventHandlers,
});
