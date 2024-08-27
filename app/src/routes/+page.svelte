<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
  <title>Fintraq</title>
</svelte:head>

<main class="bg-muted/40 flex min-h-screen w-full flex-col">
  <div class="my-4 md:my-8"></div>
  <div class="container space-y-4">
    <div>
      <h1 class="font-bold text-2xl">Fintraq</h1>
      <p>A finance tracking app built with SvelteKit and HonoJs.</p>
    </div>

    <div class="flex flex-row gap-2">
      <a href="/auth/signup">
        <Button>Get started</Button>
      </a>
      <a href="/auth/signin">
        <Button variant="outline">Login</Button>
      </a>
    </div>
  </div>
</main>
