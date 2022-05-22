<script>
  import { localDate } from '$lib/util'
  import { slugging, parseMarkdownLine } from '../util.js'

  export let posts
</script>

<div class="typography">
  <ul>
    {#each posts as post}
      <li>
        <a href="/{post.slug}">{@html parseMarkdownLine(post.metadata.title)}</a>
      </li>
    {/each}
  </ul>
</div>
