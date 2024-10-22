import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const load: RequestHandler = async ({ params }) => {
  const { author } = params;

  const response = await fetch(`/api/author/${author}`);
  if (!response.ok) {
    throw error(response.status, 'Failed to fetch author details and posts');
  }

  const data = await response.json();

  return {
    author: {
      name: data.name,
      image: data.image,
      biography: data.biography,
      twitter: data.twitter,
      linkedin: data.linkedin
    },
    posts: data.posts
  };
};
