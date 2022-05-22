<script>
  import { localDate } from '../util.js'

  export let posts
  const getMonth = new Intl.DateTimeFormat('id-ID', { month: 'long' })

  const lists = posts.reduce((b, a) => {
    const { date } = a.metadata

    const y = date.slice(0, 4)
    const m = getMonth.format(new Date(date.slice(0, 7) + '-01'))

    if (b.hasOwnProperty(y)) {
      if (b[y].hasOwnProperty(m)) b[y][m].push(a)
      else b[y][m] = [a]
    } else {
      b[y] = { [m]: [a] }
    }
    return b
  }, {})
</script>

<div class="typography">
  {#each Object.entries(lists).reverse() as [year, months]}
    <h2>{year}</h2>
    <hr />
    {#each Object.entries(months) as [month, posts]}
      <h3>{month}</h3>
      <ul>
        {#each posts as post}
          <li><a href="/{post.slug}">{post.metadata.title}</a></li>
        {/each}
      </ul>
    {/each}
  {/each}
</div>

<style lang="postcss">
  .typography {
    @apply mt-16;
    * {
      @apply my-2;
    }
    h2,
    h3 {
      @apply mt-8 mb-2;
    }
  }
</style>
