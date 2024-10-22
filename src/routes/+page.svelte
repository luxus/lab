<script lang="ts">
  import type { BlogPostMetadata } from '$lib/types';

  export let data: { posts: (BlogPostMetadata & { slug: string })[] };
</script>

<h1>Blog Posts</h1>

<ul>
  {#each data.posts as post}
    <li>
      <h2>{post.title}</h2>
      <p>Published on: {new Date(post.datePublished).toLocaleDateString()}</p>
      <p>{post.description}</p>
      <!-- Add a link to the full post when you have individual post pages -->
      <!-- <a href={`/blog/${post.slug}`}>Read more</a> -->
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 2rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
</style>
