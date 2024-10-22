import { json } from '@sveltejs/kit';
import type { BlogPostMetadata } from '$lib/types';

type BlogModule = {
  metadata: BlogPostMetadata;
  default: {
    render: () => { html: string };
  };
};

export const GET = async ({ params }) => {
  const { slug } = params;
  const modules = import.meta.glob<BlogModule>('/_posts/blog/*.md', { eager: true });

  const matchedModule = Object.entries(modules).find(([path]) => {
    const fileSlug = path.split('/').pop()?.replace('.md', '');
    return fileSlug === slug;
  });

  if (!matchedModule) {
    return json({ error: 'Post not found' }, { status: 404 });
  }

  const { metadata, default: contentModule } = await matchedModule[1]();
  const content = contentModule.render().html;

  const post = {
    ...metadata,
    content,
    slug
  };

  return json(post);
};
