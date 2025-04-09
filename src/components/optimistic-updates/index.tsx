import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { queryClient } from '../../App';

const OptimisticUpdates = () => {
  const addTodoMutation = useMutation({
    mutationFn: async (newPost: string) => {
      const response = await axios.post('http://localhost:3000/posts', {
        id: String(Date.now()),
        title: newPost,
        views: 400,
      });
      return response.data;
    },

    onMutate: async (newPost) => {
      console.log('onMutate called with:', newPost);

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['posts']) || [];
      console.log('Previous Data:', previousData);

      // Create an optimistic post
      const optimisticPost = {
        id: Date.now().toString(), // Generate unique ID
        title: newPost,
        views: 0,
      };

      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (old: any) => {
        const updatedData = [...(old || []), optimisticPost];
        console.log('Optimistic Data:', updatedData);
        return updatedData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },

    onError: (_error, _post, context) => {
      // Rollback to the previous value if the mutation fails
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData);
      }
    },

    onSettled: async () => {
      // Invalidate the query to refetch the data
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const { isPending, variables, mutate } = addTodoMutation;

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/posts');
      return response.data;
    },
  });

  return (
    <div>
      <h3>Optimistic Updates</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}

      <button onClick={() => mutate('New Optimistic Post 4')}>Add ➕</button>

      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            {post.title} - {post.views} views
          </li>
        ))}
        {isPending && <li style={{ opacity: 0.5 }}>Adding...</li>}
      </ul>
    </div>
  );
};

export default OptimisticUpdates;
