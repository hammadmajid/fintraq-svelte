<script lang="ts">
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import SuperDebug from "sveltekit-superforms";
    import { PUBLIC_SUPERFORM_DEBUG } from "$env/static/public";

    export let form;
</script>

{#if PUBLIC_SUPERFORM_DEBUG === "true"}
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="lead"
                ><i class="fa-solid fa-bug"></i></svelte:fragment
            >
            <svelte:fragment slot="summary"
                >Open SuperForm Debug</svelte:fragment
            >
            <svelte:fragment slot="content"
                ><SuperDebug data={form} />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
{/if}
