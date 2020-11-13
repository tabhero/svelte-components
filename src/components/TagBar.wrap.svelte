<script>
    import TagBar from './TagBar.svelte';

    export let suggestions;
    export let input;
    export let float;
    export let fill;

    export let _wrapConfig = {};
</script>

<style>
    p {
        padding: 1rem;
        background-color: #fff0cc;
        border-radius: .5rem;
    }

    .big-parent {
        width: 100%;
        height: 200px;
    }
    .tagbar-wrapper {
        margin: .5rem 0;
    }
</style>

<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias odio doloremque suscipit, assumenda neque dolore praesentium quae est voluptatem, exercitationem laboriosam aut quas? Accusantium beatae ab, autem at minus perspiciatis!</p>
    <div class="tagbar-wrapper" class:big-parent={_wrapConfig.parentBig}>
        <TagBar
            {suggestions}
            {input}
            {float}
            {fill}
            on:selectSuggestion
            on:selectNew />
    </div>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aliquam ex necessitatibus debitis mollitia minus animi, ipsa eaque. Aliquam nemo ut ipsam esse illum veniam enim officiis doloribus numquam nobis.</p>
