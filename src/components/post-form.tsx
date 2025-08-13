import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreatePost } from '@/http/use-create-post';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  userId: z.number().int().positive(),
});

type PostFormValues = z.infer<typeof postSchema>;

export function PostForm() {
  const {
    data: postResponse,
    mutate,
    isPending,
    isSuccess,
    error,
  } = useCreatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormValues) => {
    mutate(data, {
      onSuccess: (response) => {
        // biome-ignore lint/suspicious/noConsole: dev
        console.log('Post created successfully:', response);
        reset();
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Title:
            <input type="text" {...register('title')} />
          </label>
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label>
            Body:
            <input type="text" {...register('body')} />
          </label>
          {errors.body && <span>{errors.body.message}</span>}
        </div>
        <div>
          <label>
            User ID:
            <input
              type="number"
              {...register('userId', { valueAsNumber: true })}
            />
          </label>
          {errors.userId && <span>Invalid User ID</span>}
        </div>
        <button disabled={isPending} type="submit">
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
        {isSuccess && <div>Post created successfully!</div>}
        {error && <div>Error: {error.message}</div>}
      </form>
      <code>{JSON.stringify(postResponse, null, 2)}</code>
    </>
  );
}
