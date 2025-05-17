<script lang="ts">
import { DateTimeFormatter } from '@js-joda/core';
import { TestComponent } from '@shellicar-core-foundation/ui-svelte';
import type { PageData } from './$types';

interface Props {
  data: PageData;
}

let { data }: Props = $props();

const formatter = DateTimeFormatter.ISO_INSTANT;

const entity2Created = $derived(data.entity1?.entities2.nodes.map((x) => x.created) ?? []);
const entity2CreatedFormatted = $derived(entity2Created.map((x) => formatter.format(x)));
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="p-4 bg-white border-2 rounded-lg w-80 flex flex-col items-center gap-4">
    <h3 class="text-xl font-bold">Hello World Card</h3>
    <TestComponent />
  </div>

  <div>
    <p>Created dates:{entity2CreatedFormatted}</p>
    <p>Response from api:</p>
    <pre><code class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4">{JSON.stringify(data, undefined, 2)}</code></pre>
  </div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
