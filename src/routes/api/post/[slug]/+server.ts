import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const GET = async ({ params }) => {
  const { slug } = params;
  const filePath = path.resolve(`src/_posts/blog/${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Calculate estimated reading time
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const timeToRead = Math.ceil(words / wordsPerMinute);

  const post = {
    ...data,
    content,
    slug,
    timeToRead: `${timeToRead} min read`
  };

  return json(post);
};
