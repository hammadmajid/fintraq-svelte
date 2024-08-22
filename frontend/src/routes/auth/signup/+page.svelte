<script lang="ts">
  import type { PageData } from "./$types";

  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";

  import SuperFormDebug from "$lib/components/SuperFormDebug.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import TextInput from "$lib/components/TextInput.svelte";

  import { SignUpForm } from "@types";
  import { goto } from "$app/navigation";

  export let data: PageData;

  let formErrMessage = "";

  const { form, enhance, delayed, errors } = superForm(data.form, {
    validators: zod(SignUpForm),
    onResult({ result }) {
      if (result.type === "redirect") {
        goto(result.location);
      } else if (result.type == "error") {
        formErrMessage = result.error.message;
      }
    },
  });
</script>

<svelte:head>
  <title>Sign up | Fintraq</title>
</svelte:head>

<main
  class="flex flex-col gap-6 justify-center items-start px-4 py-12 mx-auto min-h-screen md:w-3/4"
>
  <div class="container mx-auto space-y-4">
    <h1 class="h1">Create new account</h1>
    <p>Enter your information below to create new account on Fintraq</p>
  </div>
  <SuperFormDebug form={$form} />

  <form class="space-y-2 lg:w-1/3" method="POST" use:enhance>
    <div class="flex flex-col gap-2 md:flex-row">
      <TextInput
        name="first_name"
        error={$errors.first_name}
        type="text"
        placeholder="First name"
        bind:value={$form.first_name}
      />
      <TextInput
        name="last_name"
        error={$errors.last_name}
        type="text"
        placeholder="Last name"
        bind:value={$form.last_name}
      />
    </div>

    <TextInput
      name="email"
      error={$errors.email}
      type="email"
      placeholder="Email address"
      bind:value={$form.email}
    />
    <TextInput
      name="password"
      error={$errors.password}
      type="password"
      placeholder="Password"
      bind:value={$form.password}
    />

    <p class="text-error-700">
      {formErrMessage}
    </p>

    <div class="flex flex-row gap-4 items-center">
      <button class="btn variant-filled" type="submit"
        >Sign up <i class="ml-2 fa-solid fa-arrow-right-to-bracket"></i></button
      >
      {#if $delayed}
        <ProgressRadial value={undefined} width="w-8" />
      {/if}
    </div>
  </form>
  <p>
    Already have an account? <a href="/auth/signin" class="anchor">Sign in</a>
  </p>
</main>
