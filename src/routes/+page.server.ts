import type { BlogPostMetadata } from '$lib/types';
import dayjs from 'dayjs';

type BlogModule = {
	metadata: BlogPostMetadata;
};

export const load = async () => {
	const mdModules = import.meta.glob<BlogModule>('/_posts/blog/*.md', { eager: true });
	const posts = Object.entries(mdModules)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
			const readingTime = calculateReadingTime(module.metadata.content);
			return {
				...module.metadata,
				slug,
				readingTime,
				datePublished: dayjs(module.metadata.datePublished).format('YYYY-MM-DD HH:mm'),
				author: module.metadata.author
			};
		})
		.filter(
			(post): post is BlogPostMetadata & { slug: string; readingTime: number; author: string } =>
				!!post.slug
		);

	// Sort posts by datePublished in descending order (newest first)
	const sortedPosts = posts.sort(
		(a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
	);

	return { posts: sortedPosts };
};

function calculateReadingTime(content: string) {
	const words = content.split(' ');
	const readingTime = Math.ceil(words.length / 200);
	return readingTime;
}
