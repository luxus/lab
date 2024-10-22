import type { BlogPostMetadata } from '$lib/types';

export const load = async ({ fetch }) => {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  return {
    posts
  };
};
