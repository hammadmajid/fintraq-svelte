<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

  import { enhance } from "$app/forms";
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<main class="flex min-h-screen w-full flex-col">
  <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
    Profile
  </h1>
  <form action="?/signout" method="POST" use:enhance>
    <Button type="submit">Signout</Button>
  </form>
</main>
