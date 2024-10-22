import { json } from '@sveltejs/kit';
import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
};
export const GET = async () => {
  const modules = import.meta.glob<BlogModule>('/content/blog/*.md', { eager: false });
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '');
      return { ...metadata, slug };
    })
  );
  // Sort posts by datePublished in descending order (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return json(sortedPosts);
};
