import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const GET = async () => {
  const postsDirectory = path.resolve('src/_posts/blog');
  const filenames = fs.readdirSync(postsDirectory);

  const authors = filenames.reduce((acc, filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { author, authorImage, authorBio, authorTwitter, authorLinkedIn } = JSON.parse(fileContents);

    if (!acc[author]) {
      acc[author] = {
        name: author,
        image: authorImage,
        biography: authorBio,
        twitter: authorTwitter,
        linkedin: authorLinkedIn,
        posts: []
      };
    }

    acc[author].posts.push({
      slug: filename.replace('.md', ''),
      title: JSON.parse(fileContents).title,
      datePublished: JSON.parse(fileContents).datePublished,
      description: JSON.parse(fileContents).description
    });

    return acc;
  }, {});

  return json(Object.values(authors));
};
