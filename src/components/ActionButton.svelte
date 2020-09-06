<style>
    button {
        border: 1px solid transparent;
        border-radius: .5rem;
        padding: .4rem 1rem;
        background-color: var(--col-secondary);

        font-weight: var(--font-weight-md);
        font-size: var(--font-size-lg);
        color: var(--col-light-primary);
    }

    button:active {
        border: 1px solid var(--col-secondary);
        background-color: var(--col-light-primary);
        color: var(--col-secondary);
    }
</style>

<button on:click>
    <slot>Click</slot>
</button>
