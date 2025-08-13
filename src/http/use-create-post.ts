import { useMutation } from '@tanstack/react-query';
import type { CreatePostRequest } from './types/create-post-request';
import type { CreatePostResponse } from './types/create-post-response';

async function createPost(
  post: CreatePostRequest
): Promise<CreatePostResponse> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
