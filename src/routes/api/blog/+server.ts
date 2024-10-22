import { json } from '@sveltejs/kit';
import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
};

export const GET = async () => {
  const mdModules = import.meta.glob<BlogModule>('/_posts/blog/*.md', { eager: false });
  const posts = await Promise.all(
    Object.entries(mdModules).map(async ([path, module]) => {
      const { metadata } = await module();
      const slug = path.split('/').pop()?.replace('.md', '');
      return { ...metadata, slug };
    })
  ).filter((post): post is BlogPostMetadata & { slug: string } => !!post.slug);

  // Sort posts by datePublished in descending order (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return json(sortedPosts);
};
