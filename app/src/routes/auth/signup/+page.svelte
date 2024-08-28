<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import * as Form from "$lib/components/ui/form";
  import * as Alert from "$lib/components/ui/alert/index.js";

  import CircleAlert from "lucide-svelte/icons/circle-alert";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  import { SignUpForm } from "@types";

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(SignUpForm),
    onResult({ result }) {
      if (result.type === "redirect") {
        goto(result.location);
      }
    },
  });

  const { form: formData, enhance, message, delayed } = form;
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<main class="flex min-h-screen w-full flex-col">
  <div class="my-4 md:my-8"></div>

  <Card.Root class="mx-auto max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl" tag="h1">Sign Up</Card.Title>
      <Card.Description
        >Enter your information to create an account</Card.Description
      >
    </Card.Header>

    <Card.Content>
      <div class="grid gap-4">
        {#if $message}
          <Alert.Root variant="destructive">
            <CircleAlert class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{$message}</Alert.Description>
          </Alert.Root>
        {/if}
        <form method="POST" use:enhance class="grid gap-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Form.Field {form} name="firstName">
                <Form.Control let:attrs>
                  <Form.Label>First name</Form.Label>
                  <Input
                    {...attrs}
                    type="text"
                    placeholder="Max"
                    bind:value={$formData.firstName}
                  />
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>
            </div>
            <div class="grid gap-2">
              <Form.Field {form} name="lastName">
                <Form.Control let:attrs>
                  <Form.Label>Last name</Form.Label>
                  <Input
                    {...attrs}
                    type="text"
                    placeholder="Robbinson"
                    bind:value={$formData.lastName}
                  />
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </div>

          <div class="grid gap-2">
            <Form.Field {form} name="email">
              <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input
                  {...attrs}
                  type="email"
                  placeholder="m@example.com"
                  bind:value={$formData.email}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </div>
          <div class="grid gap-2">
            <Form.Field {form} name="password">
              <Form.Control let:attrs>
                <Form.Label>Password</Form.Label>
                <Input
                  {...attrs}
                  type="password"
                  bind:value={$formData.password}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </div>
          <Button type="submit" class="w-full">
            <span class="flex flex-row gap-2 items-center">
              <span> Create an account </span>
              {#if $delayed}
                <span class="animate-spin">
                  <LoaderCircle size="18px" />
                </span>
              {/if}
            </span></Button
          >
        </form>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/auth/signin" class="underline"> Sign in </a>
      </div>
    </Card.Content>
  </Card.Root>
</main>
