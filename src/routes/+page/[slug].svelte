<script lang="ts">
	import type { BlogPostMetadata } from '$lib/types';

	export let data: { post: BlogPostMetadata & { slug: string } };
</script>

<h1>{data.post.title}</h1>

<p>Published on: {new Date(data.post.datePublished).toLocaleDateString()}</p>

<p>{data.post.description}</p>

{#if data.post.content}
	<div>{@html data.post.content}</div>
{/if}
