# Tabhero Svelte Components

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
```js
// App.svelte
<script>
    import {
        Heading,
        ActionButton,
        Input,
    } from '@tabhero/svelte-components';

    let name = '';
</script>

<Heading text="Please Introduce Yourself" />
<Input
    bind:value={name}
    placeholder="Enter your name here" />
<ActionButton
    text="Submit"
    on:click={e => alert(name)} />
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
