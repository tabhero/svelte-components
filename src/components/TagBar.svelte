<script>
    import { createEventDispatcher } from 'svelte';

    import { ADD_TAG_INPUT_MAX_LENGTH } from '../constants';

    export let suggestions = [];
    export let input = '';
    export let float = false;
    export let fill = false;

    const MAX_LEN = ADD_TAG_INPUT_MAX_LENGTH;
    let focusIndex = null;

    $: exactMatchFound = suggestions.find(tag => tag.name === input) !== undefined;
    $: empty = input === '';
    $: exceededMaxLength = input.length > MAX_LEN;

    const dispatch = createEventDispatcher();

    function handleSuggestionClick(tagId) {
        dispatch('selectSuggestion', { tagId });
    }
    function handleNewClick(inputText) {
        dispatch('selectNew', {
            tagName: inputText
        });
    }
    function handleKeydown(event) {
        const key = event.key;
        if (key === 'ArrowDown') {
            if (empty || exceededMaxLength) {
                return;
            }
            if (focusIndex === null) {
                focusIndex = 0;
            } else {
                focusIndex = (focusIndex + 1) > suggestions.length
                    ? 0
                    : (focusIndex + 1);
            }
        } else if (key === 'ArrowUp') {
            if (empty || exceededMaxLength) {
                return;
            }
            if (focusIndex === null) {
                // the existence of prompt causes the suggestions to shift one index forward in the markup
                // hence, assign index to .length
                focusIndex = exactMatchFound
                    ? suggestions.length - 1
                    : suggestions.length
            } else {
                focusIndex = (focusIndex - 1) < 0
                    ? suggestions.length
                    : (focusIndex - 1);
            }
        }
    }
    function handleInputFocus() {
        focusIndex = null;
    }
    function focusNode(node, { listIndex, focusIndex }) {
        if (focusIndex === listIndex) {
            node.focus();
        }
        return {
            update({ listIndex, focusIndex }) {
                if (focusIndex === listIndex) {
                    node.focus();
                }
            }
        };
    }
    function suggestionIndex(index) {
        if (exactMatchFound) {
            return index;
        }
        return index + 1;
    }
</script>

<div class="container" class:float class:expand={fill && empty} data-testid="container" on:keydown={handleKeydown}>
    <div class="input-container" class:empty class:expand={fill && empty}>
        <input
            bind:value={input}
            type="text"
            placeholder="Search from your tag library or create a new tag!"
            on:focus={handleInputFocus}>
    </div>
    {#if !empty}
        <div class="suggestions-container" class:float>
            {#if exceededMaxLength}
                <div class="info-prompt-wrapper">
                    <span class="prompt">Please add tags under {MAX_LEN + 1} characters only</span>
                </div>
            {:else}
                <ul>
                    {#if !exactMatchFound}
                        <li class="new" on:click={e => handleNewClick(input)} tabindex="-1" use:focusNode={{ listIndex: 0, focusIndex }}>
                            <span>{input}</span>
                            <span class="item-prompt-wrapper">
                                <span class="prompt">+Create New Tag and Add</span>
                            </span>
                        </li>
                    {/if}
                    {#each suggestions as { id, added, name }, i}
                        <li on:click={e => handleSuggestionClick(id)} tabindex="-1" use:focusNode={{ listIndex: suggestionIndex(i), focusIndex }}>
                            <span>{name}</span>
                            <span class="item-prompt-wrapper">
                                {#if added}
                                    <span class="prompt prompt-remove">-Remove</span>
                                {:else}
                                    <span class="prompt">+Add</span>
                                {/if}
                            </span>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        color: var(--col-primary);
    }
    .container.float {
        /* the absolute positioned suggestions box needs to have a relatively positioned parent */
        position: relative;
    }
    .container.expand {
        /* set all properties needed for this component to fill the parent space */
        height: 100%;
        flex: 1;

        display: flex;
        flex-direction: column
    }

    .input-container {
        padding: .5rem 1rem;

        border: solid 0.5px var(--col-primary);
        border-top-left-radius: .25rem;
        border-top-right-radius: .25rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .input-container.empty {
        border-radius: .25rem;
    }
    .input-container.expand {
        transition: flex .2s ease-in;
        flex: 1;
    }
    .input-container.expand:focus-within {
        flex: 0;
    }

    .suggestions-container {
        background-color: var(--col-light-primary);
        border: solid 0.5px var(--col-primary);
        border-top: 0;
    }
    .suggestions-container.float {
        /* these styles are to facilitate the absolutely positioned suggestion box */
        position: absolute;  /* this element's parent should be relatively positioned so that this works */
        left: 0;
        right: 0;
        overflow: auto;
        z-index: 10;
        max-height: 3.75rem;  /* cut off the scrollable view's last visible item */
    }

    input {
        width: 100%;
        font-weight: var(--font-weight-thicc);
        font-size: var(--font-size-md);
        color: inherit;
        outline: none;
    }
    input:placeholder-shown {
        font-weight: var(--font-weight-thinn);
        font-size: var(--font-size-sm);
        font-style: oblique;
        text-align: center;
    }

    li {
        cursor: default;
        padding: .2rem 1rem;
        font-weight: var(--font-weight-thin);
        font-size: var(--font-size-md);
    }
    li:not(:last-child){
        border-bottom: solid 0.5px var(--col-primary);
    }
    li.new {
        font-weight: var(--font-weight-thicc);
    }
    li:hover {
        background-color: var(--col-primary);
    }
    li:hover * {
        color: var(--col-light-primary);
    }

    .prompt {
        font-size: var(--font-size-xsm);
        font-weight: var(--font-weight-thicc);
        color: var(--col-tertiary);
        vertical-align: middle;
    }
    .prompt-remove {
        color: var(--col-secondary);
    }

    .info-prompt-wrapper {
        text-align: center;
    }
    .item-prompt-wrapper {
        margin-left: .25rem;
        white-space: nowrap;
    }
</style>
