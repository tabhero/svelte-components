# Tabhero Svelte Components

This Svelte component library was bootstrapped using [sveltejs/component-template](https://github.com/sveltejs/component-template). To know how consumers of this library will interface with these svelte components, [see here](https://github.com/sveltejs/component-template#consuming-components).

## Prep Work

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

To use this package in Svelte apps, you'll need a plugin to import css files. We recommend `rollup-plugin-postcss`. This is because Svelte apps will import this package's source code, not the built package (more information [here](https://github.com/sveltejs/component-template#consuming-components)). Non-Svelte apps will import the built package, which has the styles bundled within it, so no import of css files is needed. By the way, we have also used `rollup-plugin-postcss` to perform this bundling.

Moreover, in Svelte apps, if using `rollup-plugin-postcss`, make sure that the plugin gets the configuration of `extract: false` (it is `false` by default) so that this package's styles are bundled with the imported Svelte components. You can choose to set the plugin's configuration to `extract: true | <path>`, but then you'll have to make sure you download this extracted css file into your application, for example using the HTML `link` tag.
