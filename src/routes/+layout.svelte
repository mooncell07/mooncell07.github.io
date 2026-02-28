<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { data, children } = $props();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
/>

<svelte:head
  ><link rel="icon" href={favicon} />
  <link
    rel="preload"
    href="/fonts/PixelOperator-Bold.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />

  <link rel="preload" href="sprites/Sprite-0004.gif" as="image" />
</svelte:head>
{@render children()}
