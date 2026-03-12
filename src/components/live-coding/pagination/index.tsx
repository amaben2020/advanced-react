import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const LIMIT = 3;
  const [numOfPages, setNumOfPages] = useState(3);
  const [page, setPage] = useState(0);

  const handleFetch = useCallback(async () => {
    const response = await axios.get('http://localhost:3000/posts');
    if (response.status === 200) setData(response.data);
  }, []);

  const handleNext = () => {
    setPage((p) => p + LIMIT);
    setNumOfPages((p) => p * 2);
  };
  const handlePrev = () => {
    setPage((p) => p / LIMIT);
    setNumOfPages((p) => p / 2);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  console.log('numOfPages', numOfPages);
  console.log('page', page);

  const paginatedPosts = data.slice(page, numOfPages);

  return (
    <div>
      PaginationComponent
      {/* {JSON.stringify(data, null, 2)} */}
      {paginatedPosts.map((d) => (
        <div>
          <p>{d.title}</p>
          <p>{d.views}</p>
        </div>
      ))}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PaginationComponent;
