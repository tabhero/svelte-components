<script>
    export let value = '';
    export let placeholder = 'Enter a value';
</script>

<style>
    input {
        border: solid 0.5px var(--col-primary);
        border-radius: .25rem;
        width: 100%;
        font-size: var(--font-size-md);
        outline: none;
        text-align: center;
        padding: .5rem 1rem;
    }
</style>

<input
    bind:value
    {placeholder}
    type="text">

