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

    $: rows = zipWith(range(minRows), chunk(tags, numCols), (i, _tags) => {
        _tags = _tags === undefined
            ? []
            : _tags;
        return [i, _tags];
    });
    $: {
        if (!justMounted) {
            const rowTags = rows[focusRowIndex][1];
            const tag = rowTags[0];
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
            focusRowIndex = focusRowIndex === rows.length - 1
                ? 0
                : focusRowIndex + 1;
            justMounted = false;
        }
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
    {#each rows as [i, cells], rowInd}
        <div class="grid-row">
            {#each cells as tag, colInd}
                <div class="grid-cell">
                    <Tag
                        name={tag.name}
                        added={tag.added}
                        tabindex={(rowInd === focusRowIndex && colInd === focusColIndex) ? '0': '-1'}
                        on:click={e => dispatch('tagClick', { tagId: tag.id })}
                        bind:thisRef={tag.ref} />
                </div>
            {/each}
        </div>
    {/each}
</div>
