<script>
    import { createEventDispatcher } from 'svelte';

    export let items = [];
    export let name = Math.random().toString();

    const dispatch = createEventDispatcher();
</script>

<ul>
    {#each items as item}
        <li on:click={() => dispatch('clickItem', { id: item.id })}>
            <input class="checkbox" type="checkbox" {name} value={item.id} bind:checked={item.checked} />
            <div class="component-wrapper">
                <slot item={item}></slot>
            </div>
        </li>
    {/each}
</ul>

<style>
    li {
        display: flex;
        align-items: center;
    }
    li:not(:last-child) {
        margin-bottom: .25rem;
    }

    .component-wrapper {
        flex: 1;
    }

    .checkbox {
        margin-right: .5rem;
    }
    .checkbox:focus {
        outline-color: var(--col-focus);
    }
</style>
