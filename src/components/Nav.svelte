<script lang="ts">
  import ToggleTheme from './ToggleTheme.svelte';

  let visible = true;
  let last_scroll = 0;
  let hash_changed = false;

  const menuList = [
    {
      text: 'Catatan',
      link: '/catatan',
    },
    {
      text: 'Tentang',
      link: '/tentang',
    },
  ];

  function handle_hashchange() {
    hash_changed = true;
  }

  function handle_scroll() {
    const scroll = window.pageYOffset;
    if (!hash_changed) {
      visible = scroll < 150 || scroll < last_scroll;
    }

    last_scroll = scroll;
    hash_changed = false;
  }
</script>

<svelte:window on:hashchange={handle_hashchange} on:scroll={handle_scroll} />
<header class:visible>
  <nav>
    <div id="brand">
      <a href="/" title="Blog milik Dan">dan.my.id</a>
    </div>
    <div id="menu">
      <ul class="">
        {#each menuList as menu}
          <li>
            <a href={menu.link}>{menu.text}</a>
          </li>
        {/each}
      </ul>
      <ToggleTheme />
    </div>
  </nav>
</header>
