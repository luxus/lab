import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
};

export const load = async ({ fetch }) => {
  const response = await fetch('/api/posts');
  const posts = await response.json();

  // Sort posts by datePublished in descending order (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return { posts: sortedPosts };
};

export const fetchPostContent = async (slug: string) => {
  const response = await fetch(`/api/post/${slug}`);
  const post = await response.json();
  return post;
};
