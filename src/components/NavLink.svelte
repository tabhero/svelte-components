<style>
    span {
        color: var(--col-secondary);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-thic);
        cursor: pointer;
        text-decoration: underline;
    }
    span:focus {
        outline-color: var(--col-focus);
        outline-offset: 5px;
    }
</style>

<span on:click tabindex="0">
    <slot>go</slot>
</span>
