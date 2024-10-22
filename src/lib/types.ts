export interface Post {
  title: string;
  datePublished: string;
  lastUpdated: string;
  description: string;
  featuredImage: string;
  featuredImageAlt: string;
  ogImage: string;
  ogSquareImage: string;
  twitterImage: string;
  categories: string;
  tags: string;
  slug: string;
  content: string;
  author: string;
  authorImage: string;
  authorBio: string;
  authorTwitter: string;
  authorLinkedIn: string;
  timeToRead: string;
}

export type BlogPostMetadata = Omit<Post, 'content'>;
