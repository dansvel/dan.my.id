<script>
  import hljs from 'highlight.js';
  import marked from 'marked';

  export let content;
  export let tag = 'article';
  const renderer = {
    code(source, lang) {
      lang = lang ? lang : 'plaintext';
      return `<pre><code class="hljs ${lang}">${hljs.highlight(lang, source).value}</code></pre>`;
    },
  };

  marked.use({ renderer });
</script>

{#if tag === 'article'}
  <article class="prose lg:prose-lg xl:prose-xl max-w-none">
    {@html marked(content)}
  </article>
{:else}
  <div class="prose lg:prose-lg xl:prose-xl max-w-none">
    {@html marked(content)}
  </div>
{/if}

<style>
  div,
  article {
    @apply prose lg:prose-lg xl:prose-xl max-w-none;
  }
</style>
