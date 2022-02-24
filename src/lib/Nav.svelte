<script>
  import { page } from '$app/stores'
  import { navItems, socialLinks } from './config'

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
  $: currentPage = $page.url.pathname
</script>

<svelte:window on:hashchange={handle_hashchange} on:scroll={handle_scroll} />

<header class:show>
  <nav>
    <div id="brand">
      <!--      <div>-->
      <a href="/" title="Blog milik Dan" sveltekit:prefetch class:active={currentPage === '/'}
        >dan.my.id</a
      >
      <!--      </div>-->
    </div>
    <div id="menu">
      <ul>
        {#each navItems as menu}
          <li>
            <a sveltekit:prefetch href={menu.route} class:active={currentPage === menu.route}
              >{menu.title}</a
            >
          </li>
        {/each}
      </ul>
    </div>
    <div id="social">
      <ul>
        {#each socialLinks as link}
          <li>
            <a
              href="https://{link.platform}.com/{link.username}"
              rel="external noopener"
              title="@{link.username}"><span /></a
            >
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</header>

<!-- just for static adapter -->
<div class="hidden">
  <!--  <a href="/404">404</a>-->
  <!--  <a href="/500">500</a>-->
  <a href="/feed.xml">RSS feed</a>
</div>

<style lang="postcss">
  header {
    @apply mt-0 fixed w-full z-10 top-0 py-2
    bg-light-500 border-b-2 border-light-900
    transform -translate-y-24 sm:(-translate-y-16)
    dark:(bg-dark-500 border-dark-100)
    transition-transform;
    &.show {
      @apply transform-none;
    }
    nav {
      @apply max-w-xl sm:max-w-3xl mx-auto flex px-4 sm:px-16 space-x-2 sm:space-x-3;
      #social {
        @apply ml-auto;
        a {
          @apply flex w-7 h-7
          bg-dark-500 hover:bg-darkgreen
          dark:(bg-light-500 hover:bg-lightgreen);

          &:focus,
          &:active {
            @apply ring-3 ring-lightgreen outline-none bg-darkgreen dark:bg-lightgreen;
          }

          &[href*='facebook'] {
            -webkit-mask: url('/dist/facebook.svg');
          }
          &[href*='github'] {
            -webkit-mask: url('/dist/github.svg');
          }
          &[href*='twitter'] {
            -webkit-mask: url('/dist/twitter.svg');
          }
          &[href*='youtube'] {
            -webkit-mask: url('/dist/youtube.svg');
          }
        }
      }
      ul {
        @apply m-0 p-0 list-none flex space-x-2 sm:space-x-3;
      }
    }
  }
  a {
    @apply no-underline border-none text-darkgreen dark:text-lightgreen;
    @apply shadow-b-1 shadow-darkgreen dark:shadow-lightgreen;

    @variants hover {
      @apply outline-none;
      @apply shadow-b-3 shadow-darkgreen dark:shadow-lightgreen;
    }
    &:focus,
    &:active {
      @apply ring-3 ring-lightgreen outline-none;
    }

    #brand & {
      @apply font-bold;
    }
  }
</style>
