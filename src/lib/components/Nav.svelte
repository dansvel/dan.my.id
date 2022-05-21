<script>
  import config from '$lib/config.yaml'
  const { title, textLogo, navItems, socialLinks } = config
</script>

<header>
  <nav>
    <div id="brand">
      <a href="/" {title} sveltekit:prefetch>{textLogo}</a>
    </div>
    <div id="menu">
      <!--      <ul>-->
      {#each navItems as menu}
        <!--          <li>-->
        <a href={menu.route}>{menu.title}</a>
        <!--          </li>-->
      {/each}
      <!--      </ul>-->
    </div>
    <div id="social">
      <!--      <ul>-->
      {#each socialLinks as social}
        <!--          <li>-->
        <a href="https://{social.link}" rel="external noopener">{social.platform}</a>
        <!--          </li>-->
      {/each}
      <!--      </ul>-->
    </div>
  </nav>
</header>

<!-- just for static adapter -->
<div class="hidden">
  <a href="/404">404</a>
  <a href="/sitemap.xml">Sitemap</a>
  <a href="/feed.xml">RSS feed</a>
</div>
