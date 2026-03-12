import { FormEvent, useEffect, useMemo, useState } from 'react';
import { server } from './mock-result';

function debounce<F extends (...args: any[]) => void>(fn: F, delay = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const GoogleSearch = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await server;
        console.log(response);
        setData(response as any[]);
      } catch (error) {
        console.log(error);
      }
    };

    getResults();
  }, []);

  // create a stable debounced function once
  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        const q = value.trim().toLowerCase();
        const filtered = data.filter((elem) =>
          elem.text.toLowerCase().includes(q)
        );
        setFilteredData(filtered);
      }, 5000),
    [data] // recreate only if `data` changes
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      // optional: show all items when query is empty
      setFilteredData(data);
      return;
    }
    debouncedFilter(value);
  };

  return (
    <div>
      GoogleSearch {JSON.stringify(data)}
      <input
        type="text"
        placeholder="Search"
        style={{
          margin: 20,
          padding: 10,
        }}
        onChange={handleSearch}
      />
      <div>
        {JSON.stringify(
          filteredData.length ? filteredData : 'No results found'
        )}
      </div>
    </div>
  );
};

export default GoogleSearch;
