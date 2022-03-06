// main configuration of your site
export const site = {
  title: '',
  description: 'Powered by SvelteKit/Urara', // description
  lang: 'id-ID', // language
  author: {
    name: 'Dan', // author name
    avatar: '/images/me.png', // author image
    // status: '🌸', // author status
    // bio: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.', // author bio
  },
  url: 'https://dan.my.id',
  image: 'images/perjalanan-setengah-manusia.png',
}
// Controls how many posts are shown per page on the pagination
export const postsPerPage = 9

// Edit this to alter the main nav menu.
export const navItems = [
  {
    title: 'Catatan',
    route: '/catatan',
  },
  {
    title: 'Proyek',
    route: '/proyek',
  },
  {
    title: 'Tentang',
    route: '/tentang',
  },
]

// social media links, comment the item if you don't need it
export const socialLinks = [
  // {
  //   platform: 'facebook',
  //   username: 'username'
  // },
  {
    platform: 'github',
    username: 'dansvel',
  },
  {
    platform: 'twitter',
    username: 'dansvel',
  },
  // {
  //   platform: 'youtube',
  //   username: 'username'
  // },
]
