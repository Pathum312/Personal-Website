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

<div class="code-snippet">
	<div class="content">
		<pre><code
				><ol>{#each codeSnippet.code as line}<Line
								code={line}
								language={codeSnippet.language}
							/>{/each}</ol></code
			></pre>
	</div>
</div>

<style>
	.code-snippet {
		overflow: auto;
		margin: 1rem 0;
		border-radius: 0.25rem;
		box-sizing: border-box;
		border: 2px solid var(--clr-hover);
	}

	.code-snippet::-webkit-scrollbar {
		width: 0rem;
	}

	pre {
		padding: 1rem;
		overflow: auto;
	}

	code {
		font-size: var(--fs-default--1);
	}

	ol {
		margin-left: 2rem;
	}
</style>
