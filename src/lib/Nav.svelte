<script>
  import { page } from '$app/stores'

  const menuList = [
    {
      text: 'Catatan',
      link: '/catatan'
    },
    {
      text: 'Proyek',
      link: '/proyek'
    },
    {
      text: 'Tentang',
      link: '/tentang'
    }
  ]

  let show = true
  let last_scroll = 0
  let hash_changed = false
  function handle_hashchange() {
    hash_changed = true
  }

  function handle_scroll() {
    const scroll = window.pageYOffset
    if (!hash_changed) {
      show = scroll < 150 || scroll < last_scroll
    }

    last_scroll = scroll
    hash_changed = false
  }

  let currentPage
  $: currentPage = $page.path
</script>

<svelte:window on:hashchange={handle_hashchange} on:scroll={handle_scroll} />

<header class:show>
  <nav>
    <div id="brand">
      <div>
        <a href="/" title="Blog milik Dan" class:active={currentPage === '/'}>dan.my.id</a
        >
      </div>
    </div>
    <div id="menu">
      <ul>
        {#each menuList as menu}
          <li>
            <a href={menu.link} class:active={currentPage === menu.link}>{menu.text}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</header>

<!-- just for static adapter -->
<div class="hidden">
  <a href="/404">404</a>
  <a href="/500">500</a>
  <a href="/catatan/404">catatan/404</a>
</div>

<style lang="postcss">
  header {
    @apply mt-0 fixed w-full z-10 top-0 py-2
    bg-gray-100 border-b-2 border-gray-200
    transform -translate-y-24 sm:(-translate-y-16)
    transition-all duration-500
    dark:(bg-gray-900 border-gray-800);
    &.show {
      @apply transform-none;
    }
    nav {
      @apply px-16 max-w-5xl mx-auto flex flex-wrap
      space-y-4 sm:(space-y-0 px-16);
      #brand {
        @apply flex w-full justify-center
        sm:(w-1/2 justify-start);
      }
      #menu {
        @apply flex w-full justify-between
        sm:(w-1/2 justify-end);
        ul {
          @apply m-0 p-0 list-none flex flex-1 justify-between space-x-2
          sm:(justify-end flex-none);
        }
      }
    }
  }
  a {
    @apply py-2 shadow-none no-underline;
    #brand & {
      @apply font-black;
    }
    #menu & {
      @apply font-semibold;
    }
    &.active {
      box-shadow: 0 2px 0 0;
    }
    &:hover {
      box-shadow: 0 2px 0 0;
    }
  }
</style>
