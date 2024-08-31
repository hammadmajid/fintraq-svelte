<script lang="ts">
  import "../app.css";

  import Menu from "lucide-svelte/icons/menu";
  import WalletCard from "lucide-svelte/icons/wallet-cards";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import Github from "lucide-svelte/icons/github";
  import Dot from "lucide-svelte/icons/dot";

  import { Button } from "$lib/components/ui/button/index";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Badge } from "$lib/components/ui/badge/index";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Input } from "$lib/components/ui/input/index.js";

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

  interface Link {
    name: string;
    href: string;
    external?: boolean;
  }

  const homeLinks: Link[] = [
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

  const githubLinks: Link[] = [
    {
      name: "Issues",
      href: "https://github.com/hammadmajid/fintraq/issues",
      external: true,
    },
    {
      name: "Pull Requests",
      href: "https://github.com/hammadmajid/fintraq/pulls",
      external: true,
    },
    {
      name: "License",
      href: "https://github.com/hammadmajid/fintraq/tree/main/LICENSE",
      external: true,
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
  <footer class="pt-12 pb-28 container border-t space-y-8">
    <div class="grid md:grid-cols-[1.5fr_1fr_1fr_2fr] gap-8 md:gap-0">
      <div class="space-y-4">
        <a
          href="/"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <WalletCard class="h-6 w-6" />
          <span>Fintraq</span>
        </a>
        <p class="scroll text-muted-foreground">
          A finance tracking app build with SvelteKit and Hono.
        </p>
      </div>

      <div class="">
        <ul>
          {#each homeLinks as link}
            <li>
              <a
                class="text-muted-foreground hover:text-primary"
                href={link.href}>{link.name}</a
              >
            </li>
          {/each}
        </ul>
      </div>
      <div class="">
        <ul>
          {#each githubLinks as { name, href, external }}
            <li>
              <a
                class="text-muted-foreground hover:text-primary"
                {href}
                target={external ? "_blank" : "_self"}>{name}</a
              >
            </li>
          {/each}
        </ul>
      </div>
      <div class="space-y-3">
        <h4>Newsletter</h4>
        <p class="text-muted-foreground">
          Subscribe to our newsletter to get the latest updates.
        </p>

        <form>
          <div class="space-y-2 lg:flex lg:space-x-2 lg:space-y-0">
            <Input type="email" placeholder="email" class="w-full" required />
            <Button variant="secondary" class="w-full md:w-auto"
              >Subscribe</Button
            >
          </div>
        </form>
      </div>
    </div>
    <div class="text-center text-muted-foreground space-y-2">
      <p class="muted">Uncopyrighted 2024</p>
      <p class="text-sm flex items-center justify-center">
        <a class="block hover:text-primary" href="/terms">Terms</a>
        <Dot/>
        <a class="block hover:text-primary" href="/privacy">Privacy</a>
      </p>
    </div>
  </footer>
</div>
