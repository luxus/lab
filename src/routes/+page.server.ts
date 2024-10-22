import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
};

export const load = async () => {
  const mdModules = import.meta.glob<BlogModule>('/_posts/blog/*.md', { eager: true });
  const posts = Object.entries(mdModules).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.md', '');
    return { ...module.metadata, slug };
  }).filter((post): post is BlogPostMetadata & { slug: string } => !!post.slug);

  // Sort posts by datePublished in descending order (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return { posts: sortedPosts };
};
