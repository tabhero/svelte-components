import { action } from '@storybook/addon-actions';

import TagBar from './TagBar.wrap.svelte';

import { ADD_TAG_INPUT_MAX_LENGTH } from '../constants';

export default {
    title: 'TagBar',
    component: TagBar,
};

const eventHandlers = {
    selectSuggestion: action('selectSuggestion'),
    selectNew: action('selectNew')
};

export const EmptyInput = () => ({
    Component: TagBar,
    props: {
        input: '',
        suggestions: [],
    },
    on: eventHandlers,
});

export const NoSuggestions = () => ({
  Component: TagBar,
  props: {
      input: 'Go',
      suggestions: [],
  },
  on: eventHandlers,
});

export const FewSuggestions = () => ({
  Component: TagBar,
  props: {
      input: 'Go',
      suggestions: [
          { id: 'xyz', added: false, name: 'Goa' },
          { id: 'xyz', added: false, name: 'Google' }
      ],
  },
  on: eventHandlers,
});

export const ManySuggestions = () => ({
    Component: TagBar,
    props: {
        input: 'G',
        suggestions: Array(10).fill({ id: 'xyz', added: false, name: 'Google' }),
    },
    on: eventHandlers,
});

export const SomeAddedSuggestions = () => ({
    Component: TagBar,
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
    Component: TagBar,
    props: {
        input: 'Goa',
        suggestions: [{ id: 'xyz', added: false, name: 'Goa' }],
    },
    on: eventHandlers,
});

export const InputMaxLength = () => ({
    Component: TagBar,
    props: {
        input: Array(ADD_TAG_INPUT_MAX_LENGTH).fill('G').join(''),
        suggestions: [],
    },
    on: eventHandlers,
});

export const InputMaxLengthExceeded = () => ({
    Component: TagBar,
    props: {
        input: Array(ADD_TAG_INPUT_MAX_LENGTH + 1).fill('G').join(''),
        suggestions: [],
    },
    on: eventHandlers,
});

export const FloatWithManySuggestions = () => ({
    Component: TagBar,
    props: {
        input: 'G',
        suggestions: Array(10).fill({ id: 'xyz', added: false, name: 'Google' }),
        float: true,
    },
    on: eventHandlers,
});

export const ParentBigWithoutFill = () => ({
    Component: TagBar,
    props: {
        input: '',
        suggestions: [],
        float: true,
        fill: false,
        _wrapConfig: {
            parentBig: true
        }
    },
    on: eventHandlers,
});

export const ParentBigWithFill = () => ({
    Component: TagBar,
    props: {
        input: '',
        suggestions: [],
        float: true,
        fill: true,
        _wrapConfig: {
            parentBig: true
        }
    },
    on: eventHandlers,
});

export const ParentBigWithFillWithInput = () => ({
    Component: TagBar,
    props: {
        input: 'G',
        suggestions: Array(10).fill({ id: 'xyz', added: false, name: 'Google' }),
        float: true,
        fill: true,
    },
    on: eventHandlers,
});
