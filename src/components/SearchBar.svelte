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

    input {
        font-size: var(--font-size-md);
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
