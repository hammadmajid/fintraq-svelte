<script lang="ts">
  export let name: string;
  export let error: string[] | undefined;
  export let type: "text" | "password" | "email" = "text";
  export let placeholder: string;
  export let value: string;
</script>

<label for={name} class="label">
  <input
    {name}
    id={name}
    {...{ type }}
    {placeholder}
    class="input"
    bind:value
  />

  {#if error}
    <small class="text-error-800">{error}</small>
  {/if}
</label>
