<script lang="ts">
	let { alignment = 'center', fontSize = 'meduim' } = $props();
</script>

<footer class="{alignment} {fontSize}">
	<p><i>"Code, deploy, repeat—and snack in between!"</i></p>
	<p>~ Pathum Senanayake</p>
</footer>

<style>
	footer {
		gap: 0.5rem;
		display: flex;
		padding: 2rem 0;
		flex-direction: column;
	}

	/* Align the footer items to the left, center or right */
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

	/* Font Sizes for footer */
	.small {
		font-size: var(--fs-quote--1);
	}

	.medium {
		font-size: var(--fs-quote-0);
	}

	.large {
		font-size: var(--fs-quote-1);
	}
</style>
