<script lang="ts">
	import type { BlogPostMetadata } from '$lib/types';

	export let data: {
		posts: (BlogPostMetadata & { slug: string; readingTime: number; author: string })[];
	};
</script>

<h1>Blog Posts</h1>

<ul>
	{#each data.posts as post}
		<li>
			<h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
			<p>Published on: {post.datePublished}</p>
			<p>Author: {post.author}</p>
			<p>Reading Time: {post.readingTime} minutes</p>
			<p>{post.description}</p>
		</li>
	{/each}
</ul>
