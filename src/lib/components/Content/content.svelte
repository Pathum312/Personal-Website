<main>
	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
        width: 100%;
		max-width: 70ch;
	}
</style>
