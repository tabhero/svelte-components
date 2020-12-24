<script>
    import { createEventDispatcher } from 'svelte';
    import { range } from 'lodash-es';

    export let numPages = 0;
    export let currentIndex = 0;

    let focusableIndex = currentIndex;

    $: currentIndex = currentIndex < 0
        ? 0
        : currentIndex > numPages - 1
            ? numPages - 1
            : currentIndex;

    const dispatch = createEventDispatcher();

    function handleKeydown(event) {
        const key = event.key;
        if (key === 'ArrowRight') {
            focusableIndex = focusableIndex >= numPages - 1
                ? 0
                : focusableIndex + 1;
        }
        if (key === 'ArrowLeft') {
            focusableIndex = focusableIndex <= 0
                ? numPages - 1
                : focusableIndex - 1;
        }
    }
    function handlePageFocus(pageIndex) {
        focusableIndex = pageIndex;
    }
    function focusNode(node, { nodeIndex, focusableIndex }) {
        return {
            update({ nodeIndex, focusableIndex }) {
                if (focusableIndex === nodeIndex) {
                    node.focus();
                }
            }
        };
    }
</script>

<nav on:keydown={handleKeydown} data-testid="page-nav">
    <button on:click={() => dispatch('clickLeft')}>&lt;</button>
    <ul>
        {#each range(numPages) as i}
            <li on:click={() => dispatch('clickPage', { page: i })}>  <!-- making the larger area the clickable area -->
                <span
                    class:current={i === currentIndex}
                    aria-label={`Page ${i + 1}`}
                    tabindex={i === focusableIndex ? '0' : '-1'}
                    on:focus={() => handlePageFocus(i)}
                    use:focusNode={{ nodeIndex: i, focusableIndex }}>
                </span>
            </li>
        {/each}
    </ul>
    <button on:click={() => dispatch('clickRight')}>&gt;</button>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
    }

    nav ul {
        padding: 0;
        margin: 0;
        list-style-type: none;

        flex-grow: 1;
        display: flex;
    }

    li {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li span {
        height: .4rem;
        width: 80%;
        border-radius: .2rem;
        background-color: var(--col-dark-secondary);
    }
    li span.current {
        background-color: var(--col-primary);
    }
    li span:focus {
        outline-color: var(--col-focus);
        outline-offset: 2px;
    }

    button {
        border: none;
        outline-color: var(--col-focus);
        background-color: var(--col-light-primary);
    }
</style>
