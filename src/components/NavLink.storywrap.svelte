<script>
    import NavLink from './NavLink.svelte';

    export let slot;
</script>

{#if slot}
    <NavLink on:click>{slot}</NavLink>
{:else}
    <NavLink on:click></NavLink>
{/if}

