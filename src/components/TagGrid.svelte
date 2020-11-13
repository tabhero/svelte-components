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
    let justMounted = true;
    let containerRef;

    $: rows = chunk(tags, numCols)
    $: gridRows = zipWith(range(minRows), rows, (i, tagRow) => {
        tagRow = tagRow === undefined
            ? []
            : tagRow;
        return [i, tagRow];
    });
    $: {
        if (!justMounted) {
            const tagRow = rows[focusRowIndex];
            const tag = tagRow[focusColIndex];
            if (tag.ref) {
                tag.ref.focus();
            }
        }
    }

    function handleKeyDown(event) {
        if (document.activeElement === containerRef) {
            return;
        }

        const key = event.key;
        if (key === 'ArrowDown') {
            focusRowIndex = nextFocusRowIndex(focusRowIndex);
        }
        if (key === 'ArrowUp') {
            focusRowIndex = prevFocusRowIndex(focusRowIndex);
        }
        if (key === 'ArrowRight') {
            focusColIndex = focusColIndex === rows[focusRowIndex].length - 1
                ? 0
                : focusColIndex + 1;
        }
        if (key === 'ArrowLeft') {
            focusColIndex = focusColIndex === 0
                ? rows[focusRowIndex].length - 1
                : focusColIndex - 1;
        }
        justMounted = false;
    }
    function handleTagFocus(rowIndex, colIndex) {
        focusRowIndex = rowIndex;
        focusColIndex = colIndex;
    }

    function nextFocusRowIndex(rowIndex) {
        let candidate = rowIndex === rows.length - 1
            ? 0
            : rowIndex + 1;
        while (!rows[candidate][focusColIndex]) {
            candidate = candidate === rows.length - 1
                ? 0
                : candidate + 1;
        }
        return candidate;
    }
    function prevFocusRowIndex(rowIndex) {
        let candidate = rowIndex === 0
            ? rows.length - 1
            : rowIndex - 1;
        while (!rows[candidate][focusColIndex]) {
            candidate = candidate === 0
                ? rows.length - 1
                : candidate - 1;
        }
        return candidate;
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

<div class="container" data-testid="container" tabindex="0" on:keydown={handleKeyDown} bind:this={containerRef}>
    {#each gridRows as [i, cells], rowInd}
        <div class="grid-row">
            {#each cells as tag, colInd}
                <div class="grid-cell">
                    <Tag
                        name={tag.name}
                        added={tag.added}
                        tabindex={(rowInd === focusRowIndex && colInd === focusColIndex) ? '0': '-1'}
                        on:click={e => dispatch('tagClick', { tagId: tag.id })}
                        bind:thisRef={tag.ref}
                        on:focus={() => handleTagFocus(rowInd, colInd)} />
                </div>
            {/each}
        </div>
    {/each}
</div>
