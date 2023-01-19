<script>
  import config from '$lib/config.yaml'
  const { title, textLogo, navItems, socialLinks } = config
</script>

<div class="navbar bg-base-100 max-w-3xl mx-auto">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl" {title} sveltekit:prefetch>{textLogo}</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <!-- <div id="menu"> -->
      {#each navItems as menu}
        <li>
          <a href={menu.route}>{menu.title}</a>
        </li>
      {/each}
      <!-- </div>
    <div id="social"> -->
      {#each socialLinks as social}
        <li>
          <a href="https://{social.link}" rel="external noopener">{social.platform}</a>
        </li>
      {/each}
      <!-- </div> -->
    </ul>
  </div>
</div>
