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
        line-height: var(--font-size-md);
    }
    .medium {
        font-size: var(--font-size-md);
        line-height: var(--font-size-lg);
    }

    .bold {
        font-weight: var(--font-weight-thicc);
    }
</style>
