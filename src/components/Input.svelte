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
        text-align: center;
        padding: .5rem 1rem;
    }
    input:focus {
        outline: 0;
        border-color: transparent;
        box-shadow: 0 0 0 2px var(--col-focus);
    }
</style>

<input
    bind:value
    {placeholder}
    type="text">

