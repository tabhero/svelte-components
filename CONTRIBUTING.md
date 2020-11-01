# Contributing

This Svelte component library was bootstrapped using [sveltejs/component-template](https://github.com/sveltejs/component-template). To know how consumers of this library will interface with these svelte components, [see here](https://github.com/sveltejs/component-template#consuming-components).

## Development

1. Make your code changes
2. Add the changes to the staging area
3. Run `npm run bump` to update the package version. This will also interactively add `package.json` and `package-lock.json` to the staging area.
4. Commit and push to remote. The push will trigger a publish to npm.

## Prep Work

These are the resources used to learn how to set up this project. Some of them have been implemented, while others are here for consideration.

### Building + Publishing Svelte Components

- https://github.com/sveltejs/svelte/issues/397
- https://github.com/sveltejs/rollup-plugin-svelte#pkgsvelte
- https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow

### Svelte Preprocessing

- CSS Preprocessing:
    - https://github.com/MadLittleMods/postcss-css-variables#preserve-default-false
- Rollup tools:
    - https://github.com/egoist/rollup-plugin-postcss
    - https://www.npmjs.com/package/svelte-preprocess
- Examples:
    - https://github.com/jumanja/SvelteBulma/blob/master/rollup.config.js
- Discussions:
    - https://dev.to/steelvoltage/comment/bp6c
    - https://stackoverflow.com/questions/56483209/import-css-in-node-modules-to-svelte

### Licensing

- https://resources.whitesourcesoftware.com/blog-whitesource/open-source-licenses-explained

### Testing

- Ensuring that the components look correct in different states and that they emit the correct events is done with [Storybook](https://www.learnstorybook.com/intro-to-storybook/svelte/en/get-started/).
- Ensuring that components behave correctly given various user inputs, etc is done with [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro).
- Each component has two types of interfaces:
    - those that face the end user (the styles, response to keyboard events, etc)
    - those that face the developer using this library (the props required and the events emitted by the components)

    More useful info on this from [Kent C. Dodds](https://kentcdodds.com/blog/avoid-the-test-user). Since Testing Library is end-user-centric, the test suite focuses on the end user interfaces. As a result, we currently lack any testing for the events emitted by the Svelte components (developer-facing). For these events, all we're doing is manually checking to see if they're emitted using Storybook.

## Design Decisions

- :white_check_mark: __We can now pass in child components__
Some components, like `Heading`, would naturally take in child components as content, like ```<Heading>Heading Text</Heading>```
but we chose to provide content as props (`<Heading text="Heading Text" />`) because currently, Storybook doesn't support the Svelte template syntax. We could create a story wrapper to achieve this, but this is something we're willing to forgo for now.
