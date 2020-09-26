<script>
    import { chunk, zipWith, range } from 'lodash-es';
    import { createEventDispatcher } from 'svelte';

    import Tag from './Tag.svelte';

    export let tags = [];
    export let minRows = 1;

    const dispatch = createEventDispatcher();
    const numCols = 2;

    $: rows = zipWith(range(minRows), chunk(tags, numCols), (i, _tags) => {
        _tags = _tags === undefined
            ? []
            : _tags;
        return [i, _tags];
    });
</script>

<style>
    .container {
        display: grid;
        grid-auto-rows: 1fr;
        grid-row-gap: 1rem;

        /* DEBUG */
        /* background-color: red; */
        /* border: 1px solid black; */
    }

    .grid-row {
        display: flex;
        justify-content: space-between;
    }
</style>

<div class="container">
    {#each rows as [i, cells]}
        <div class="grid-row">
            {#each cells as tag}
                <div class="grid-cell">
                    <Tag name={tag.name} added={tag.added} on:click={e => dispatch('tagClick', { tagId: tag.id })} />
                </div>
            {/each}
        </div>
    {/each}
</div>
