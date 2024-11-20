<script lang="ts">
	type Props = {
		src: string; // Path to the image
		alt: string; // Alternative text
		width: string; // Width of the image
		height: string; // Height of the image
		type?: string; // Type of the image, a profile, icon or normal
	};

	let { src, alt, width, height, type = 'normal' }: Props = $props();
</script>

<img {src} {alt} {width} {height} class={type} />

<style>
	img {
		height: auto;
		max-width: 100%;
		font-style: italic;
		margin-bottom: 1rem;
		vertical-align: middle;
		border-radius: 0.25rem;
	}

	.normal {
		width: 100%;
	}

	.profile {
		width: 7rem;
	}

	.icon {
		width: 3rem;
	}
</style>
