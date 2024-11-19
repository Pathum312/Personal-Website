<script lang="ts">
	let { alignment = 'center', fontSize = 'medium' } = $props();
</script>

<header class="{alignment} {fontSize}">
	<a href="/">Home</a>
	<a href="/about">About</a>
</header>

<style>
	header {
		display: flex;
		padding: 2rem 0;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--clr-hover);
	}

	a:first-child {
		margin-right: 1rem;
	}

	/* Align the header items to the left, center or right */
	.center {
		align-items: center;
		justify-content: center;
	}

	.left {
		align-items: flex-start;
		justify-content: flex-start;
	}

	.right {
		align-items: flex-end;
		justify-content: flex-end;
	}

	/* Font Sizes for header */
	.small {
		font-size: var(--fs-default--1);
	}

	.medium {
		font-size: var(--fs-default-0);
	}

	.large {
		font-size: var(--fs-default-1);
	}
</style>
