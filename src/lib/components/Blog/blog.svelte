<script lang="ts">
	import DB from '$lib/source/DB.json';
	import { goto } from '$app/navigation';
	import { type Year, type Month, type Article } from '$lib';
	import Link from './Link/link.svelte';

	type Props = {
		tag?: string;
	};

	type Blog = Year[];

	let { tag }: Props = $props();

	/**
	 * Navigates to the article
	 *
	 * @param url - The url of the article
	 */
	const handleClick = (url: string) => {
		goto(url);
	};

	/**
	 * Filters the articles by tag
	 *
	 * @returns The filtered articles
	 */
	const filterArticlesByTag = (): Blog => {
		return DB.filter((blog: Year) =>
			blog.months.some((month: Month) =>
				month.articles.some((article: Article) => article.tag === tag),
			),
		);
	};

	const blogs: Blog = tag ? filterArticlesByTag() : DB;
</script>

{#if blogs.length === 0}
	<p class="text center">No related articles found! 😢</p>
	<p class="text center">
		<Link href="/" content="Return Home" target="_self" />
	</p>
{:else}
	{#each blogs as blog}
		<p class="year">{blog.year}</p>
		{#each blog.months as month}
			<p class="month">{month.name}</p>
			{#each month.articles as article}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="article" onclick={() => handleClick(article.url)}>
					<p class="text">{article.name}</p>
					<p class="text">{article.date}</p>
				</div>
			{/each}
		{/each}
	{/each}
	{#if tag}
		<p class="text center">
			<Link href="/" content="Return Home" target="_self" />
		</p>
	{/if}
{/if}

<style>
	.year {
		font-size: var(--fs-year-0);
	}

	.month {
		display: flex;
		justify-content: flex-end;
		font-size: var(--fs-month-0);
	}

	.text {
		display: flex;
		font-size: var(--fs-default-0);
	}

	.center {
		justify-content: center;
	}

	.article {
		display: flex;
		margin-bottom: 1rem;
		justify-content: space-between;
	}

	.article:hover .text {
		cursor: pointer;
		color: var(--clr-hover);
	}
</style>
