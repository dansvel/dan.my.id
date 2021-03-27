<script>
  import ToggleTheme from './ToggleTheme.svelte'

  let show = true
  let last_scroll = 0
  let hash_changed = false

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
</script>

<svelte:window on:hashchange={handle_hashchange} on:scroll={handle_scroll} />
<header class:show>
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
        <li class="hidden">
          <a href="/404">404</a>
        </li>
        <li class="hidden">
          <a href="/500">500</a>
        </li>
      </ul>
      <ToggleTheme />
    </div>
  </nav>
</header>

<style lang="postcss">
  header {
    @apply py-2 mt-0 fixed w-full z-10 top-0 bg-gray-100;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translate(0, calc(-100% - 1rem));
    transition: transform 0.5s, background-color 0.5s, box-shadow 0.5s;
    &.show {
      transform: none;
    }
    :global(.dark) & {
      @apply bg-gray-900;
      box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1);
    }
    nav {
      @apply max-w-4xl px-4 mx-auto flex flex-wrap items-center;
      #brand {
        @apply flex w-full md:w-1/2 justify-center md:justify-start font-extrabold;
        a {
          @apply px-4 py-2;
        }
      }
      #menu {
        @apply flex w-full md:w-1/2 px-2 content-center justify-between md:justify-end;
        ul {
          @apply list-none flex justify-between md:justify-end flex-1 md:flex-none items-center;
          a {
            @apply inline-block py-2 px-3 mr-0 sm:mr-2;
          }
        }
      }
    }
  }
</style>
