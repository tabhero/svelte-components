<script>
    import SearchButton from './SearchButton.svelte';

    export let slot;
</script>

{#if slot}
    <SearchButton on:click>{slot}</SearchButton>
{:else}
    <SearchButton on:click></SearchButton>
{/if}

