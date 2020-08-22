<script>
    import { chunk, range } from 'lodash-es';
    import TagGrid from './TagGrid.svelte'
    import Info from './Info.svelte';

    export let tags = [];

    $: pages = chunk(tags, 6);
    let currentIndex = 0;  // TODO possible bug: currentIndex needs to change when it goes out of pages range

    function incrementPage() {
        if (currentIndex >= pages.length - 1) return;
        currentIndex = currentIndex + 1;
    }

    function decrementPage() {
        if (currentIndex <= 0) return;
        currentIndex = currentIndex - 1;
    }

    function setPage(index) {
        currentIndex = index;
    }
</script>

<div class="container">
    <div class="content">
        {#if tags.length}
            <TagGrid tags={pages[currentIndex]} minRows={3} on:tagClick />
        {:else}
            <Info content={[
                [true, 'Add a tag'],
                [false, 'to get started'],
            ]} />
        {/if}
    </div>
    {#if pages.length > 1}
        <nav>
            <button on:click={decrementPage}>&lt;</button>
            <ul>
                {#each range(pages.length) as i}
                    <li on:click={() => setPage(i)}>  <!-- making the larger area the clickable area -->
                        <span class:current={i === currentIndex}></span>
                    </li>
                {/each}
            </ul>
            <button on:click={incrementPage}>&gt;</button>
        </nav>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        /* DEBUG */
        /* background-color: yellow; */
        /* border: 1px solid black; */
    }

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
