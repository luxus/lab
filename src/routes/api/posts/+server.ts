import { json } from '@sveltejs/kit';

type BlogModule = {
  metadata: BlogPostMetadata;
};

export const GET = async () => {
  const modules = import.meta.glob<BlogModule>('/_posts/blog/*.md', { eager: false });
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '');
      return { ...metadata, slug };
    })
  );

  return json(posts);
};
