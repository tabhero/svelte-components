<script>
    import { createEventDispatcher } from 'svelte';

    export let items = [];

    const dispatch = createEventDispatcher();
</script>

<style>
    li:not(:last-child) {
        margin-bottom: .5rem;
    }
</style>

<ul>
    {#each items as item}
        <li on:click={() => dispatch('clickItem', { id: item.id })}>
            <slot item={item}></slot>
        </li>
    {/each}
</ul>
