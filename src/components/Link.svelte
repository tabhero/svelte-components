<script>
    export let title;
    export let url;
    export let faviconUrl;
    export let faviconSize = 24;

    // <a /> and window.open() should avoid tabnabbing:
    // https://mathiasbynens.github.io/rel-noopener
    // https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#tabnabbing
</script>

<div class="container">
    <img src={faviconUrl} alt={faviconUrl} width={faviconSize} height={faviconSize} />
    <a class="title" href={url} target="_blank" rel="noopener noreferrer">{title}</a>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
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
    .title:focus {
        outline-color: var(--col-focus);
        outline-offset: 5px;
    }
</style>
