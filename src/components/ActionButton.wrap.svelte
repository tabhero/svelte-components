<script>
    import ActionButton from './ActionButton.svelte';

    export let slot;
</script>

{#if slot}
    <ActionButton on:click>{slot}</ActionButton>
{:else}
    <ActionButton on:click></ActionButton>
{/if}

