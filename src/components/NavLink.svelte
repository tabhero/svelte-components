<style>
    span {
        color: var(--col-secondary);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-thic);
        cursor: pointer;
        text-decoration: underline;
    }
</style>

<span on:click>
    <slot>go</slot>
</span>
