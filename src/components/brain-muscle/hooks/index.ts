import React from 'react';
import { useQuery } from '@tanstack/react-query';

const useFetch = (): { data: any; isLoading: boolean } => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['ben'],
    queryFn: fetchData,
  });

  return { data, isLoading };
};

export default useFetch;
