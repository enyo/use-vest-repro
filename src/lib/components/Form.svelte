<script lang="ts">
	import { useVest } from './use-vest';

	// Import everything about our vest suite.
	import { suite, initialData, type FormData } from './test-suite';

	// A fake submit implementation
	import { setContext } from 'svelte';

	setContext('foo', 'bar');

	const { action } = useVest<FormData>(suite, {
		initialData,
		submit: async () => {
			console.log('Submitting...');
		}
	});
</script>

<form use:action />
