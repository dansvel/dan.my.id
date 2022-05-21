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
      show = scroll < 1500 || scroll < last_scroll
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
      {#each navItems as menu}
        <a href={menu.route}>{menu.title}</a>
      {/each}
    </div>
    <div id="social">
      {#each socialLinks as social}
        <a href="https://{social.link}" rel="external noopener">{social.platform}</a>
      {/each}
    </div>
  </nav>
</header>

<!-- just for static adapter -->
<div class="hidden">
  <a href="/404">404</a>
  <a href="/sitemap.xml">Sitemap</a>
  <a href="/feed.xml">RSS feed</a>
</div>
