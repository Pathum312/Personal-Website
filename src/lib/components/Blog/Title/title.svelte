<script lang="ts">
	type Props = {
		alignment?: string;
	};

	let { alignment = 'left' }: Props = $props();
</script>

<!-- svelte-ignore slot_element_deprecated -->
<p class="title {alignment}">
	<slot />
</p>

<style>
	.title {
		display: flex;
		margin-bottom: 0.25rem;
		font-size: var(--fs-year--1);
	}

	.left {
		justify-content: flex-start;
	}

	.center {
		justify-content: center;
	}

	.right {
		justify-content: flex-end;
	}
</style>
