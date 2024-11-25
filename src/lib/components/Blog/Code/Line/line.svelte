<script lang="ts">
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';
	import 'highlight.js/styles/github-dark.css';

	type Props = {
		code: string;
		language?: string;
	};

	let { code, language = 'javascript' }: Props = $props();

	let highlightedCode: string = $state('');

	/**
	 * By default, hightlight.js blocks the & in &amp;nbsp;, so we will be undoing that behavior
	 *
	 * @param html - The highlight formatted html
	 *
	 * @returns The fixed html
	 */
	const fixWhitespaceBlocks = (html: string): string => {
		return html.replace(/&amp;nbsp;/g, '&nbsp;');
	};

	onMount(() => {
		highlightedCode = hljs.highlight(code, { language }).value;
		highlightedCode = fixWhitespaceBlocks(highlightedCode);
	});
</script>

<li class="code-line">
	{@html highlightedCode}
</li>

<style>
	.code-line {
		padding: 0.25rem 0;
		font-family: monospace;
		font-size: var(--fs-default--1);
	}

	.code-line::marker {
		color: var(--clr-hover);
	}
</style>
