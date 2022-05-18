<script>
  export let id
  export let title = ''
</script>

<div class="video-container">
  <!-- prettier-ignore -->
  <iframe
    src="https://www.youtube.com/embed/{id}" {title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</div>

<style>
  .video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .video-container::after {
    padding-top: 56.25%;
    display: block;
    content: '';
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
