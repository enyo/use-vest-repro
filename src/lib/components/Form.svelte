<script>
	// Change this to ./use-vest to see it working
	// import { useVest } from './use-vest';
	import { useVest } from 'use-vest';

	import { create } from 'vest';

	const suite = create(() => null);

	const { action } = useVest(suite, {
		initialData: {},
		submit: () => Promise.resolve()
	});
</script>

<form use:action>My Form</form>
