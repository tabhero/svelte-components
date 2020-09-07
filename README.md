# Tabhero Svelte Components

![Publish Documentation](https://github.com/tabhero/svelte-components/workflows/Publish%20Documentation/badge.svg)
![Publish Package](https://github.com/tabhero/svelte-components/workflows/Publish%20Package/badge.svg)
![Remove old artifacts](https://github.com/tabhero/svelte-components/workflows/Remove%20old%20artifacts/badge.svg)
![NPM Version](https://img.shields.io/npm/v/@tabhero/svelte-components?color=blue)

Svelte components for the TabHero project.

## Installation

```
// with npm
npm install @tabhero/svelte-components

// with yarn
yarn add @tabhero/svelte-components
```

## Configuration

To use this package in Svelte apps, you'll need a plugin to import css files. We recommend `rollup-plugin-postcss`. This is because Svelte apps will import this package's source code, not the built JS bundle (more information [here](https://github.com/sveltejs/component-template#consuming-components)). Non-Svelte apps will import the built JS bundle, which has the styles bundled within it (hence the styles are also client-side rendered using JS), so you don't need to import this package's css into your application. By the way, we have also used `rollup-plugin-postcss` to perform this bundling.

```js
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
    // ...
    plugins: [
        postcss({
            extract: false,
            inject: {
                insertAt: 'top'
            }
        }),
    ]
}
```

Configure `extract: false` (it is `false` by default) so that this package's styles are bundled in with the rest of your app's JS bundle. You can choose to set the plugin's configuration to `extract: true | <path>`, but then you'll have to make sure you download this extracted css file into your application, for example using the HTML `link` tag.
The configuration `insertAt: 'top'` let's your app override this package's CSS, which is especially important because this package comes with its own CSS resets.

## Usage

### Svelte Apps
```svelte
// App.svelte
<script>
    import {
        Heading,
        ActionButton,
        Input,
    } from '@tabhero/svelte-components';

    let name = '';
</script>

<Heading>Please Introduce Yourself</Heading>
<Input
    bind:value={name}
    placeholder="Enter your name here" />
<ActionButton on:click={e => alert(name)}>Submit</ActionButton>
```

### Non-Svelte Apps

[TBD]

### Tips

Some styles of this package's components are specified using the rem unit. So by resetting the font-size of the root element in your app, you can rescale these styles to fit your requirements. The most notable of these styles are:

- padding
- margin
- border-radius
- max-height and min-height
- grid-row-gap

## Contribution

- [Contribution Guide](/CONTRIBUTING.md)
