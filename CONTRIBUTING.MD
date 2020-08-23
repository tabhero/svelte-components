# Contributing

This Svelte component library was bootstrapped using [sveltejs/component-template](https://github.com/sveltejs/component-template). To know how consumers of this library will interface with these svelte components, [see here](https://github.com/sveltejs/component-template#consuming-components).

## Development

1. Make your code changes
2. Add the changes to the staging area
3. Run `npm run bump` to update the package version. This will also interactively add `package.json` and `package-lock.json` to the staging area.
4. Push to remote. The push will trigger a publish to npm.

## Prep Work

These are the resources used to learn how to set up this project. Some of them have been implemented, while others are here for consideration.

### Building + Publishing Svelte Components

- https://github.com/sveltejs/svelte/issues/397
- https://github.com/sveltejs/rollup-plugin-svelte#pkgsvelte

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

## Design Decisions

- Some components, like `Heading`, would naturally take in child components as content, like ```<Heading>Heading Text</Heading>```
but we chose to provide content as props (`<Heading text="Heading Text" />`) because currently, Storybook doesn't support the Svelte template syntax. We could create a story wrapper to achieve this, but this is something we're willing to forgo for now.
