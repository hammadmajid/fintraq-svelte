<script>
    import { AppBar } from "@skeletonlabs/skeleton";
    import "../app.css";
</script>

<AppBar shadow="drop-shadow-xl" label="header">
    <svelte:fragment slot="lead"
        ><p class="h3"><a href="/">Fintraq</a></p></svelte:fragment
    >
    <svelte:fragment slot="trail"
        ><a href="https://github.com/hammadmajid/fintraq"
            ><i class="w-6 h-6 fa-brands fa-github"></i></a
        ></svelte:fragment
    >
</AppBar>
<slot></slot>
