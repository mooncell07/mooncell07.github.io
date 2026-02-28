<script>
  let { smoother } = $props();
</script>

<div
  id="scrollToTop"
  class="opacity-0 fixed bottom-5 right-5 md:bottom-10 md:right-15 z-20"
>
  <button
    id="scrollToTopButton"
    title="Back To Top"
    class="rounded-full cursor-pointer w-10 h-10 text-(--text) bg-(--surface) duration-150 hover:bg-(--love) hover:text-(--surface) shadow-sm"
    onclick={() => smoother.scrollTo("#landing", true, "center center")}
    ><i class="fa-solid fa-arrow-up"></i></button
  >
</div>
