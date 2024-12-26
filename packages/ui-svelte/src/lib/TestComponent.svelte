<script lang="ts">
let value = $state(50);
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick={() => value += 1}>
  I'm from the ui lib! {value}
</button>
