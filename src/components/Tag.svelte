<script>
    export let name = '';
    export let added = false;
    export let tabindex = '-1';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('click');
    };
    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Enter') {
            dispatch('click');
        }
    };
</script>

<style>
    .container {
        background-color: var(--col-light-primary);
        border: solid 0.5px var(--col-primary);
        border-radius: 1.5rem;
        width: 16ch;  /* few ch higher than .text width */
    }
    .container:focus {
        outline: 0;
        box-shadow: 0 0 0 2px var(--col-focus);
    }
    .container.added {
        background-color: var(--col-primary);
    }
    .container.added:focus {
        border: solid 0.5px var(--col-light-primary);
    }

    .text {
        font-weight: var(--font-weight-thicc);
        font-size: var(--font-size-md);
        color: var(--col-primary);
        text-align: center;
        margin: auto;
        cursor: default;

        width: 13ch;
        line-height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .text.added {
        color: var(--col-light-primary);
    }

    /* TODO: include hover case for feedback */
</style>

<div class="container"
    data-testid="tag-container"
    class:added
    on:click|stopPropagation={handleClick}
    on:keydown={handleKeyDown}
    {tabindex}>
    <div class="text" class:added>{name}</div>
</div>
