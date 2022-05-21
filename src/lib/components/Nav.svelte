<script>
  import config from '$lib/config.yaml'
  const { title, textLogo, navItems, socialLinks } = config

  let show = true
  let last_scroll = 0
  let hash_changed = false
  function handle_hashchange() {
    hash_changed = true
  }

  function handle_scroll() {
    const scroll = window.pageYOffset
    if (!hash_changed) {
      show = scroll < 500 || scroll < last_scroll
    }

    last_scroll = scroll
    hash_changed = false
  }
</script>

<svelte:window on:hashchange={handle_hashchange} on:scroll={handle_scroll} />
<header class:show>
  <nav>
    <div id="brand">
      <a href="/" {title} sveltekit:prefetch>{textLogo}</a>
    </div>
    <div id="menu">
      <ul>
        {#each navItems as menu}
          <li>
            <a href={menu.route}>{menu.title}</a>
          </li>
        {/each}
      </ul>
    </div>
    <div id="social">
      <ul>
        {#each socialLinks as social}
          <li>
            <a href="https://{social.link}" rel="external noopener">{social.platform}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</header>

<!-- just for static adapter -->
<div class="hidden">
    <a href="/404">404</a>
    <a href="/sitemap.xml">Sitemap</a>
  <a href="/feed.xml">RSS feed</a>
</div>

<style lang="postcss">
  header {
    @apply py-4 sticky z-99 top-0;
    @apply shadow-b shadow-md shadow-light-500 bg-light-500 dark:(shadow-dark-500 bg-dark-500);
    @apply transform -translate-y-20;
    &.show {
      @apply transform-none;
    }

    nav {
      @apply max-w-3xl w-full mx-auto px-4;
      @apply flex justify-between;

      > div {
        @apply flex basis-full;
        &#brand {
          @apply font-bold;
        }
        &#social {
          @apply justify-end;
        }
        ul {
          @apply flex space-x-2;
        }
      }
    }
  }
</style>
