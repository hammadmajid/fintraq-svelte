<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import * as Form from "$lib/components/ui/form";

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

  const { form: formData, enhance } = form;
</script>

<main class="bg-muted/40 flex min-h-screen w-full flex-col">
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
        <form method="POST" use:enhance class="grid gap-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Form.Field {form} name="first_name">
                <Form.Control let:attrs>
                  <Form.Label>First name</Form.Label>
                  <Input
                    {...attrs}
                    type="text"
                    placeholder="Max"
                    bind:value={$formData.first_name}
                  />
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>
            </div>
            <div class="grid gap-2">
              <Form.Field {form} name="last_name">
                <Form.Control let:attrs>
                  <Form.Label>Last name</Form.Label>
                  <Input
                    {...attrs}
                    type="text"
                    placeholder="Robbinson"
                    bind:value={$formData.last_name}
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
          <Button type="submit" class="w-full">Create an account</Button>
        </form>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/auth/signin" class="underline"> Sign in </a>
      </div>
    </Card.Content>
  </Card.Root>
</main>
