<script lang="ts">
    import type { PageData } from "./$types";

    import { superForm } from "sveltekit-superforms";
    import { zod } from "sveltekit-superforms/adapters";

    import SuperFormDebug from "$lib/components/SuperFormDebug.svelte";
    import { ProgressRadial } from "@skeletonlabs/skeleton";

    import { SignUpForm } from "@types";

    export let data: PageData;

    const { form, enhance, delayed, errors } = superForm(data.form, {
        validators: zod(SignUpForm),
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
            <label class="label">
                <input
                    class="input"
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    bind:value={$form.first_name}
                />
                {#if $errors.first_name}
                    <small class="text-error-700">{$errors.first_name}</small>
                {/if}
            </label>
            <label class="label">
                <input
                    class="input"
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    bind:value={$form.last_name}
                />
                {#if $errors.last_name}
                    <small class="text-error-700">{$errors.last_name}</small>
                {/if}
            </label>
        </div>

        <label for="email" class="label">
            <input
                class="input"
                type="email"
                name="email"
                placeholder="Email address"
                bind:value={$form.email}
            />
            {#if $errors.email}
                <small class="text-error-700">{$errors.email}</small>
            {/if}
        </label>
        <label class="label">
            <input
                class="input"
                placeholder="Password"
                type="password"
                name="password"
                bind:value={$form.password}
            />
            {#if $errors.password}
                <small class="text-error-700">{$errors.password}</small>
            {/if}
        </label>

        <div class="flex flex-row gap-4 items-center">
            <button class="btn variant-filled" type="submit"
                >Sign up <i class="ml-2 fa-solid fa-arrow-right-to-bracket"
                ></i></button
            >
            {#if $delayed}
                <ProgressRadial value={undefined} width="w-8" />
            {/if}
        </div>
    </form>
    <p>
        Already have an account? <a
            href="/auth/signin"
            class="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800"
            >Sign in</a
        >
    </p>
</main>
