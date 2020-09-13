<script>
    import CheckList from './CheckList.svelte';

    export let name;
    export let items;
    export let slot;
</script>

<CheckList {items} {name} on:clickItem let:item={item}>
    <svelte:component this={slot} {...item} />
</CheckList>
