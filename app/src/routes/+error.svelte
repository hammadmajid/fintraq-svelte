<script lang="ts">
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
</script>

<main class="min-h-[80vh] grid place-content-center">
  <div class="space-y-3 text-center">
    <div class="space-y-1">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        {$page.status}
      </h1>
      <p class="text-xl text-foreground-muted">{$page.error?.message}</p>
    </div>
    <a href="/" class="block">
      <Button size="sm">Take me home</Button>
    </a>
  </div>
</main>
