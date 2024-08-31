<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import * as Accordion from "$lib/components/ui/accordion/index";

  import { tiers, PaymentType } from "$lib/content/tiers";
  import { FAQs } from "$lib/content/faq";

  let paymentType: PaymentType = PaymentType.Monthly;

  import { mode } from "mode-watcher";
</script>

<svelte:head>
  <title>Fintraq</title>
</svelte:head>

<main class="flex min-h-screen w-full flex-col gap-24">
  <div></div>
  <div class="container grid md:grid-cols-2 items-center">
    <div class="space-y-4">
      <div class="space-y-2">
        <h1
          id="product"
          class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl"
        >
          Fintraq
        </h1>
        <p class="text-muted-foreground text-xl">
          A finance tracking app built with SvelteKit and HonoJs
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
    <div class="hidden md:block">
      {#if $mode == "light"}
        <img src="/hero.svg" alt="Astronuat in space" />
      {:else}
        <img src="/hero-dark.svg" alt="Astronuat in space" />
      {/if}
    </div>
  </div>

  <section class="container space-y-4">
    <div class="space-y-2 text-center capitalize">
      <h2
        id="pricing"
        class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Choose the Plan That's Right for You.
      </h2>
      <div class="space-y-3 text-muted-foreground">
        <p class="text-xl">How Would You Like to Pay?</p>
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
    <div class="flex flex-col md:flex-row md:items-end md:justify-center gap-8">
      {#each tiers as tier}
        <Card.Root
          class="md:min-w-[300px] md:max-w-[350px] h-full last:bg-blend-multiply last:shadow-2xl last:shadow-primary"
        >
          <Card.Header>
            <Card.Title>{tier.title}</Card.Title>
            <Card.Description>{tier.description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <h4>
              <span class="font-bold text-2xl">
                ${tier.amount(paymentType).base}</span
              >.<span class="align-super"
                >{tier.amount(paymentType).decimal}
              </span>/
              <span>
                {tier.amount(paymentType).mode}
              </span>
            </h4>
            <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
              {#each tier.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          </Card.Content>
          <Card.Footer>
            <a href="/auth/signup" class="w-full">
              <Button variant={tier.button} class="w-full">{tier.action}</Button
              >
            </a>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  </section>
  <section class="container space-y-4">
    <div class="text-center space-y-2 capitalize">
      <h2
        id="help"
        class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Frequently Asked Questions
      </h2>
      <p class="text-xl text-muted-foreground">
        Everything You Need to Know About This Project.
      </p>
    </div>
    <Accordion.Root class="w-full sm:max-w-[50%] mx-auto">
      {#each FAQs as FAQ}
        <Accordion.Item value={FAQ.value}>
          <Accordion.Trigger>{FAQ.question}</Accordion.Trigger>
          <Accordion.Content>
            {FAQ.answer}
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </section>
  <div></div>
  <section
    class="bg-primary p-8 md:px-20 md:py-20 flex flex-col items-center text-center"
  >
    <h2
      class="text-secondary scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Need more information?
    </h2>
    <p class="text-muted-foreground mt-2 text-lg md:text-xl">
      Our team is happy to help you get started as fast as possible.
    </p>
    <div class="mt-5">
      <a href="/auth/contact">
        <Button variant="secondary">Contact us</Button>
      </a>
    </div>
  </section>
</main>
