<script lang="ts">
	import { type Year } from '$lib';
	import { goto } from '$app/navigation';
	import DB from '$lib/source/DB.json';

	const handleClick = (url: string) => {
		goto(url);
	};

	type Blog = Year[];

	const blogs: Blog = DB;
</script>

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
		font-size: var(--fs-default-0);
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
