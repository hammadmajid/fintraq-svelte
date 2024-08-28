<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";

  import { tiers, PaymentType } from "$lib/content/tiers";

  let paymentType: PaymentType = PaymentType.Monthly;
</script>

<svelte:head>
  <title>Fintraq</title>
</svelte:head>

<main class="flex min-h-screen w-full flex-col gap-24">
  <div></div>
  <div class="container space-y-4">
    <div class="space-y-2">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Fintraq
      </h1>
      <p class="text-muted-foreground text-xl">
        A finance tracking app built with SvelteKit and HonoJs.
      </p>
    </div>

    <div class="flex flex-row gap-2">
      <a href="/auth/signup">
        <Button>Get started</Button>
      </a>
      <a href="/auth/signin">
        <Button variant="secondary">Login</Button>
      </a>
    </div>
  </div>
  <section class="container space-y-4">
    <div class="space-y-2 text-center">
      <h2
        id="pricing"
        class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Choose the plan that's right for you.
      </h2>
      <div class="space-y-3">
        <p class="text-xl">How would you like to pay?</p>
        <div class="flex items-center space-x-2 justify-center">
          <Label for="payment-type">Monthly</Label>
          <Switch
            id="payment-type"
            on:click={() => {
              if (paymentType === PaymentType.Yearly)
                paymentType = PaymentType.Monthly;
              else paymentType = PaymentType.Yearly;
            }}
          />
          <Label for="payment-type">Yearly</Label>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      {#each tiers as teir}
        <Card.Root>
          <Card.Header>
            <Card.Title>{teir.title}</Card.Title>
            <Card.Description>{teir.description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <h4>
              <span class="font-bold text-2xl">
                ${teir.amount(paymentType).base}</span
              >.<span class="align-super"
                >{teir.amount(paymentType).decimal}
              </span>/
              <span>
                {teir.amount(paymentType).mode}
              </span>
            </h4>
            <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
              {#each teir.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          </Card.Content>
          <Card.Footer>
            <a href="/auth/signup" class="w-full">
              <Button variant={teir.button} class="w-full">{teir.action}</Button
              >
            </a>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  </section>
  <div></div>
</main>
