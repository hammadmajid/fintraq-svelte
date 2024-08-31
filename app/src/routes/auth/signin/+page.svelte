<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index";
  import * as Form from "$lib/components/ui/form";
  import * as Alert from "$lib/components/ui/alert/index.js";

  import CircleAlert from "lucide-svelte/icons/circle-alert";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  import { SignInForm } from "@types";

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(SignInForm),
    onResult({ result }) {
      if (result.type === "redirect") {
        goto(result.location);
      }
    },
  });

  const { form: formData, enhance, message, delayed } = form;
</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
  <div class="flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Welcome back!</h1>
        <p class="text-muted-foreground text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <!-- FORM BEGIN -->

      <div class="grid gap-4">
        {#if $message}
          <Alert.Root variant="destructive">
            <CircleAlert class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{$message}</Alert.Description>
          </Alert.Root>
        {/if}
        <form method="POST" use:enhance class="grid gap-2">
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
                <Form.Label>
                  <p class="flex flex-row justify-between items-center">
                    <span>Password</span>
                    <a
                      href="/auth/password-reset"
                      class="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </a>
                  </p>
                </Form.Label>
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
              <span> Sign In </span>
              {#if $delayed}
                <span class="animate-spin">
                  <LoaderCircle size="18px" />
                </span>
              {/if}
            </span></Button
          >
        </form>
      </div>

      <!-- FORM END -->

      <div class="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <a href="/auth/signup" class="underline"> Sign up </a>
      </div>
    </div>
  </div>
  <div class="bg-muted hidden lg:block">
    <img
      src="/placeholder.avif"
      alt="placeholder"
      width="1920"
      height="1080"
      class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  </div>
</div>
