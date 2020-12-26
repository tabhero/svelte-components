<script>
    export let name = '';
    export let numTabs;
    export let createdAt;
</script>

<div class="container" on:click tabindex="0">
    <span class="name">{name}</span>
    <span>[{numTabs}]</span>
    <span>{createdAt.toLocaleDateString()}</span>
</div>

<style>
    .container {
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;  /* without this, a slight y overflow exists */

        max-width: max-content;
        padding: .25rem .5rem;
    }
    .container:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .container:focus {
        outline: solid 1px var(--col-focus);
    }

    .name {
        font-weight: var(--font-weight-thicc);
    }
</style>
