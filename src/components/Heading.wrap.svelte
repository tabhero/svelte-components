<script>
    import Heading from './Heading.svelte';

    export let slot;
</script>

{#if slot}
    <Heading>{slot}</Heading>
{:else}
    <Heading></Heading>
{/if}

