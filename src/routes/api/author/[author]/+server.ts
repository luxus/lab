import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const GET = async ({ params }) => {
  const { author } = params;
  const postsDirectory = path.resolve('src/_posts/blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      slug: filename.replace('.md', '')
    };
  }).filter(post => post.author === author);

  return json(posts);
};
