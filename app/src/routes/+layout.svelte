<script>
  import "../app.css";

  import Menu from "lucide-svelte/icons/menu";
  import WalletCard from "lucide-svelte/icons/wallet-cards";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import Github from "lucide-svelte/icons/github";

  import { Button } from "$lib/components/ui/button/index";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Badge } from "$lib/components/ui/badge/index";
  import * as Tooltip from "$lib/components/ui/tooltip";

  import { ModeWatcher } from "mode-watcher";
  import { resetMode, setMode } from "mode-watcher";

  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  export let data;

  const duration = 200;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y, duration, delay };
  const transitionOut = { easing: cubicIn, y: -y, duration };

  const homeLinks = [
    {
      name: "Product",
      href: "/#product",
    },
    {
      name: "Pricing",
      href: "/#pricing",
    },
    {
      name: "Help",
      href: "/#help",
    },
    {
      name: "Changelog",
      href: "https://github.com/hammadmajid/fintraq/commits/main/",
    },
  ];
</script>

<ModeWatcher />

<div class="flex min-h-screen w-full flex-col">
  <header
    class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6"
  >
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
      <a
        href="/"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <WalletCard class="h-6 w-6" />
        <span>Fintraq</span>
      </a>
      {#each homeLinks as link}
        <a
          href={link.href}
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.name}
        </a>
      {/each}
    </nav>
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
          builders={[builder]}
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <a href="/" class="flex items-center gap-2 text-lg font-semibold">
            <WalletCard class="h-6 w-6" />
            <span>Fintraq</span>
          </a>

          {#each homeLinks as link}
            <a
              href={link.href}
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          {/each}
        </nav>
      </Sheet.Content>
    </Sheet.Root>
    <div class="flex-1 w-full"></div>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Badge variant="destructive">Pre alpha</Badge>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Work in progress. Expect bugs!</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <a href="https://github.com/hammadmajid/fintraq" target="_blank">
      <Button variant="outline" size="icon">
        <Github />
      </Button>
    </a>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item on:click={() => setMode("light")}
          >Light</DropdownMenu.Item
        >
        <DropdownMenu.Item on:click={() => setMode("dark")}
          >Dark</DropdownMenu.Item
        >
        <DropdownMenu.Item on:click={() => resetMode()}
          >System</DropdownMenu.Item
        >
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </header>
  {#key data.pathname}
    <div class="bg-muted/40" in:fly={transitionIn} out:fly={transitionOut}>
      <slot />
    </div>
  {/key}
</div>
