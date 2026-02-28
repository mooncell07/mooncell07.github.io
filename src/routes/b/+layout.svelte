<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="container mx-auto px-4">
  <div class="preset flex flex-col justify-center items-center min-h-[100svh]">
    {@render children()}
  </div>
</div>

<style>
  :global(.preset h1) {
    color: var(--text);
    font-weight: 700;
    font-size: 3rem;

    border-bottom: 0.5rem solid var(--love);
  }
</style>
