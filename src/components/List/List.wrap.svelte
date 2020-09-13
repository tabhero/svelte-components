<script>
    import List from './List.svelte';

    export let items = [];
    export let slot;
</script>

<List {items} on:clickItem let:item={item}>
    <svelte:component this={slot} {...item} />
</List>
