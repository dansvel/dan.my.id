<script>
  import { localDate } from '$lib/util.js'

  export let posts

  const getMonth = new Intl.DateTimeFormat('id-ID', { month: 'long' })

  $: lists = posts.reduce((b, a) => {
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
  {#each Object.entries(lists).reverse() as [year, months] (year)}
    <div class="divider">{year}</div>
    {#each Object.entries(months) as [month, posts] (month)}
      <h3>{month}</h3>
      <ul>
        {#each posts as post (post.slug)}
          <li><a class="link link-primary" href="/{post.slug}">{post.metadata.title}</a></li>
        {/each}
      </ul>
    {/each}
  {/each}
</div>
