import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const GET = async () => {
  const postsDirectory = path.resolve('src/_posts/blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate estimated reading time
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const timeToRead = Math.ceil(words / wordsPerMinute);

    return {
      ...data,
      content,
      slug: filename.replace('.md', ''),
      timeToRead: `${timeToRead} min read`
    };
  });

  return json(posts);
};
