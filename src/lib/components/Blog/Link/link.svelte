<script lang="ts">
	type Props = {
		href: string;
		content: string;
	};

	let { href, content }: Props = $props();
</script>

<a {href} target="_blank">
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
