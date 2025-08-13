import { useQuery } from '@tanstack/react-query';
import type { GetUserResponse } from './types/get-user-response';

interface useUsersParams {
  id: string;
}

async function fetchUserById(id: string): Promise<GetUserResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  ) as Promise<GetUserResponse>;
}

export function useUser({ id }: useUsersParams) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
}
