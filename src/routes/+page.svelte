<script lang="ts">
  import type { BlogPostMetadata } from '$lib/types';
  import { fetchPostContent } from './+page.server';

  export let data: { posts: (BlogPostMetadata & { slug: string, author: string, timeToRead: string })[] };

  let expandedPostSlug: string | null = null;

  const expandPost = async (slug: string) => {
    if (expandedPostSlug === slug) {
      expandedPostSlug = null;
    } else {
      expandedPostSlug = slug;
      const post = await fetchPostContent(slug);
      const postElement = document.getElementById(`post-${slug}`);
      if (postElement) {
        postElement.innerHTML = post.content;
      }
    }
  };
</script>

<h1>Blog Posts</h1>

<ul>
  {#each data.posts as post}
    <li>
      <h2>{post.title}</h2>
      <p>Published on: {new Date(post.datePublished).toLocaleDateString()}</p>
      <p>Author: {post.author}</p>
      <p>{post.description}</p>
      <p>Estimated reading time: {post.timeToRead}</p>
      <a href="javascript:void(0)" on:click={() => expandPost(post.slug)}>Read more</a>
      <div id={`post-${post.slug}`}></div>
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
