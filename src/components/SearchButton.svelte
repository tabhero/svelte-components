<style>
    button {
        border: 1px solid var(--col-secondary);
        border-radius: .4rem;
        background-color: var(--col-light-primary);
        padding-bottom: .25rem;
        padding-left: .75rem;
        padding-right: .75rem;

        font-size: var(--font-size-md);
        font-weight: var(--font-weight-thin);
        color: var(--col-secondary);
        vertical-align: text-top;
    }
</style>

<button on:click>
    🔍&nbsp;&nbsp; <slot>Search</slot>
</button>
