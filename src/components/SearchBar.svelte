<script>
    export let value = '';
    export let placeholder = 'Search';
</script>

<style>
    .container {
        padding: .25rem .75rem;
        border: 1px solid var(--col-secondary);
        border-radius: .25rem;

        display: flex;
    }
    .container:focus-within {
        border-color: transparent;
        box-shadow: 0 0 0 2px var(--col-focus);
    }

    input {
        font-size: var(--font-size-md);
        color: var(--col-secondary);
        width: 100%;
        outline: none;
        flex: 1;
    }

    .icon {
        padding-top: .25rem;
        margin-left: .25rem;
    }
</style>

<div class="container">
    <input bind:value {placeholder} type="text" />
    <span class="icon">🔍</span>
</div>
