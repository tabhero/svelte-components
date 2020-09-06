<script>
    import { createEventDispatcher } from 'svelte';
    import { range } from 'lodash-es';

    export let numPages = 0;
    export let currentIndex = 0;

    $: currentIndex = currentIndex < 0
        ? 0
        : currentIndex > numPages - 1
            ? numPages - 1
            : currentIndex;

    const dispatch = createEventDispatcher();
</script>

<nav>
    <button on:click={() => dispatch('clickLeft')}>&lt;</button>
    <ul>
        {#each range(numPages) as i}
            <li on:click={() => dispatch('clickPage', { page: i })}>  <!-- making the larger area the clickable area -->
                <span class:current={i === currentIndex}></span>
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

    button {
        border: none;
        background-color: var(--col-light-primary);
    }
</style>
