<script>
  import { page } from "$app/state";
</script>

<div
  class="flex w-screen min-h-[100svh] justify-center items-center font-bold flex-col"
>
  <span class="text-(--love) text-6xl">{page.status}</span>
  <span class="text-(--text) text-6xl">{page.error.message}</span>
</div>
