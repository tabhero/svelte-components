<script>
    import { chunk, zipWith, range } from 'lodash-es';
    import { createEventDispatcher } from 'svelte';

    import Tag from './Tag.svelte';

    export let tags = [];
    export let minRows = 1;

    const dispatch = createEventDispatcher();
    const numCols = 2;
    let focusRowIndex = 0;
    let focusColIndex = 0;

    $: rows = zipWith(range(minRows), chunk(tags, numCols), (i, _tags) => {
        _tags = _tags === undefined
            ? []
            : _tags;
        return [i, _tags];
    });

    function getTabIndex(rowIndex, colIndex) {
        return (rowIndex === focusRowIndex && colIndex === focusColIndex)
            ? '0'
            : '-1';
    }
</script>

<style>
    .container {
        display: grid;
        grid-auto-rows: 1fr;
        grid-row-gap: 1rem;
        padding: .5rem;

        /* DEBUG */
        /* background-color: red; */
        /* border: 1px solid black; */
    }
    .container:focus {
        outline-color: var(--col-focus);
    }

    .grid-row {
        display: flex;
        justify-content: space-between;
    }
</style>

<div class="container" data-testid="container" tabindex="0">
    {#each rows as [i, cells], rowInd}
        <div class="grid-row">
            {#each cells as tag, colInd}
                <div class="grid-cell">
                    <Tag name={tag.name} added={tag.added} tabindex={getTabIndex(rowInd, colInd)} on:click={e => dispatch('tagClick', { tagId: tag.id })} />
                </div>
            {/each}
        </div>
    {/each}
</div>
