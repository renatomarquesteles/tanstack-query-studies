import { useSuspenseQuery } from '@tanstack/react-query';
import type { GetUsersResponse } from './types/get-users-response';

async function fetchUsers(): Promise<GetUsersResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
    res.json()
  ) as Promise<GetUsersResponse>;
}

export function useUsers() {
  return useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}
