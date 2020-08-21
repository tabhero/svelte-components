<script>
    import { createEventDispatcher } from 'svelte';

    export let text = '';

    const dispatch = createEventDispatcher();
</script>
<style>
    p {
        color: red;
    }
</style>
<h1>Hi!</h1>
<p on:click={e => dispatch('text-click')}>{text}</p>
