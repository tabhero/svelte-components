<script>
    import TagBar from './TagBar.svelte';

    export let suggestions;
    export let input;
    export let float;
    export let fill;

    export let _wrapConfig = {};
</script>

<style>
    p {
        text-align: center;
    }

    .big-parent {
        width: 100%;
        height: 200px;
    }
</style>

<p>Some content above the component</p>
    <div class:big-parent={_wrapConfig.parentBig}>
        <TagBar
            {suggestions}
            {input}
            {float}
            {fill}
            on:selectSuggestion
            on:selectNew />
    </div>
<p>Some content below the component</p>
