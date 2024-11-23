<script lang="ts">
	type Props = {
		href: string;
		content: string;
		target?: string;
	};

	let { href, content, target = '_blank' }: Props = $props();
</script>

<a {href} {target}>
	{content}
</a>

<style>
	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--clr-hover);
	}
</style>
