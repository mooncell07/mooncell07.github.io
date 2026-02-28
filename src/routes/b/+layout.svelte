<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex justify-center items-center">
  <div
    class="preset mt-25 w-[75%] flex flex-col justify-start items-start min-h-[100svh]"
  >
    {@render children()}
  </div>
</div>

<style>
  :global(.preset h1) {
    color: var(--text);
    font-weight: 700;
    font-size: 2rem;
  }
  :global(.preset #date) {
    color: var(--highlightHigh);
    font-weight: 600;
    font-size: 1rem;
  }
</style>
