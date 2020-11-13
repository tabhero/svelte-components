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
            focusRowIndex = cycleToValidTag(focusRowIndex, i => i === rows.length - 1 ? 0 : i + 1);
        }
        if (key === 'ArrowUp') {
            focusRowIndex = cycleToValidTag(focusRowIndex, i => i === 0 ? rows.length - 1 : i - 1);
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

    function cycleToValidTag(rowIndex, mover) {
        let candidate = mover(rowIndex);
        while (!rows[candidate][focusColIndex]) {
            candidate = mover(candidate);
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
