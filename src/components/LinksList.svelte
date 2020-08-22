<script>
    export let links = [];
    export let faviconSize = 24;

    // <a /> and window.open() should avoid tabnabbing:
    // https://mathiasbynens.github.io/rel-noopener
    // https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#tabnabbing
</script>

<style>
    li {
        display: flex;
        align-items: center;
    }
    li:not(:last-child) {
        margin-bottom: .5rem;
    }

    img {
        margin-right: .5rem;

        /* maintain the favicon's aspect ratio given any image size */
        object-fit: contain;
    }

    .title {
        text-decoration: none;
        color: var(--col-dark-primary);

        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;  /* without this, a slight y overflow exists */
    }
    .title:hover {
        text-decoration: underline;
    }
</style>

<div class="container">
    <ul>
        {#each links as { title, url, faviconUrl }}
            <li>
                <img src={faviconUrl} alt={faviconUrl} width={faviconSize} height={faviconSize} />
                <a class="title" href={url} target="_blank" rel="noopener noreferrer">{title}</a>
            </li>
        {/each}
    </ul>
</div>
