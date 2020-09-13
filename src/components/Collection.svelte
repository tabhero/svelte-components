<script>
    export let name = '';
    export let numTabs;
    export let createdAt;
</script>

<div class="container" on:click>
    <span class="name">{name}</span>
    <span>[{numTabs}]</span>
    <span>{createdAt.toLocaleDateString()}</span>
</div>

<style>
    .container {
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;  /* without this, a slight y overflow exists */
    }
    .container:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .name {
        font-weight: var(--font-weight-thicc);
    }
</style>
