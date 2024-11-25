<script lang="ts">
	import Line from './Line/line.svelte';

	type CodeSnippet = {
		language: string;
		code: string[];
	};

	type Props = {
		codeSnippet: CodeSnippet;
	};

	let { codeSnippet }: Props = $props();
</script>

<div class="code">
	<ol class="code-lines-list">
		{#each codeSnippet.code as line}
			<Line code={line} language={codeSnippet.language} />
		{/each}
	</ol>
</div>

<style>
	.code {
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 0.25rem;
		border: 2px solid var(--clr-hover);
	}

	.code-lines-list {
		padding-left: 1.5rem;
	}
</style>
