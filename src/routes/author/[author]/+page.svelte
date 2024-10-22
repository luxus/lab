<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let author;
  let posts = [];

  $: {
    const { author: authorParam } = $page.params;
    fetch(`/api/author/${authorParam}`)
      .then((response) => response.json())
      .then((data) => {
        author = data.author;
        posts = data.posts;
      })
      .catch((error) => {
        console.error('Error fetching author details:', error);
        goto('/');
      });
  }
</script>

<h1>{author.name}</h1>
<img src={author.image} alt="{author.name}" />
<p>{author.biography}</p>
<p>
  <a href={`https://twitter.com/${author.twitter}`} target="_blank">Twitter</a> |
  <a href={author.linkedin} target="_blank">LinkedIn</a>
</p>

<h2>Recent Posts</h2>
<ul>
  {#each posts as post}
    <li>
      <h3>{post.title}</h3>
      <p>Published on: {new Date(post.datePublished).toLocaleDateString()}</p>
      <p>{post.description}</p>
      <a href={`/blog/${post.slug}`}>Read more</a>
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

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  img {
    max-width: 150px;
    border-radius: 50%;
  }

  a {
    color: #1e90ff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
