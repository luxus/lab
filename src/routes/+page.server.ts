import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
};

export const fetchPostContent = async (slug: string) => {
  const response = await fetch(`/api/post/${slug}`);
  const post = await response.json();
  return post;
};
