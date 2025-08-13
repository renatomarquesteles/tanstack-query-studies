import type { Post } from '@/types/post';

export type CreatePostRequest = Omit<Post, 'id'>;
