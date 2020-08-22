<script>
    export let content = [];
    export let fontSize = 'medium';
</script>

<p class="container"
    class:small={fontSize === 'small'}
    class:medium={fontSize === 'medium'}>
    {#each content as [ bold, text ], i}
        <span> </span>
        <span class:bold>{text}</span>
    {/each}
</p>

<style>
    .container {
        color: var(--col-tertiary);
        text-align: center;

        /* small info text should have small padding */
        padding: .5em;
    }

    .small {
        font-size: var(--font-size-sm);
    }
    .medium {
        font-size: var(--font-size-md);
    }

    .bold {
        font-weight: var(--font-weight-thicc);
    }
</style>
