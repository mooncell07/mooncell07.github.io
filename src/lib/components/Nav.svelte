<script>
  import { MediaQuery } from "svelte/reactivity";

  let { navEntries, smoother } = $props();
  const isMobile = new MediaQuery("(max-width: 600px)");
  function scroller(navEntry) {
    if (isMobile.current) {
      smoother.scrollTo(navEntry["narrow"], true, "top 100px");
    } else {
      smoother.scrollTo(navEntry["wide"], true, "center center");
    }
  }
</script>

<div
  id="nav"
  class="flex fixed w-full h-10 mt-10 justify-center items-center z-10"
>
  <div
    class="flex flex-row justify-center items-center text-(--text) bg-(--surface)/30 backdrop-blur-sm border-(--overlay) py-1 pl-2 pr-3 md:py-2 md:pl-3 md:pr-4 text-base md:text-lg font-bold rounded-3xl border border-(--overlay)"
  >
    <button
      id="landingButton"
      class="cursor-pointer"
      onclick={() => smoother.scrollTo("#landing", true, "center center")}
    >
      <img src="sprites/Sprite-0003.gif" alt="logo" class="mt-1 size-10" />
    </button>
    <span class="text-(--overlay) mr-4 md:mr-8 ml-2 md:ml-5 select-none">|</span
    >

    <div class="flex gap-4 md:gap-8">
      {#each navEntries as navEntry}
        <button
          class="text-(--text) cursor-pointer duration-150 hover:text-(--love)"
          onclick={() => scroller(navEntry)}
          >{navEntry.name}
        </button>
      {/each}
    </div>
  </div>
</div>
