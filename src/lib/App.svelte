<script lang="ts">
  let count = 0;
</script>

<div id="svelte-plugin">
  <button on:click={() => count++}>Count: {count}</button>
</div>
