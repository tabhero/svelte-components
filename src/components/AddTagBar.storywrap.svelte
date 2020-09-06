<script>
    import AddTagBar from './AddTagBar.svelte';

    export let suggestions;
    export let input;
    export let float;
</script>

<style>
    p {
        text-align: center;
    }
</style>

<p>Some content above the component</p>
<AddTagBar
    {suggestions}
    {input}
    {float}
    on:selectSuggestion
    on:selectNew />
<p>Some content below the component</p>
