import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context';

type TSearch = {
  temperature: string;
  humidity: string;
  windSpeed: string;
  title?: string;
};

type TSearchResult = {
  temperature: string;
  humidity: string;
  windSpeed: string;
  title?: string;
};

export function WeatherDashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [prevSearch, setPrevSearch] = useState<TSearchResult[]>([]);
  const [searchResult, setSearchResult] = useState<TSearchResult | null>(null);

  const data = useAuthContext();

  useEffect(() => {}, []);

  console.log(data);

  const mockWeatherData = {
    'New York': {
      temperature: '22°C',
      humidity: '56%',
      windSpeed: '15 km/h',
    },
    'Los Angeles': {
      temperature: '27°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    London: {
      temperature: '15°C',
      humidity: '70%',
      windSpeed: '20 km/h',
    },
  };

  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    const response = mockWeatherData[searchTerm];

    if (!response) {
      setError('City not found');
    }

    if (response) {
      setSearchResult(response);
      setPrevSearch(
        (prev) =>
          [...prev, { ...searchResult, title: searchTerm }] as TSearchResult[]
      );
    }
  };

  const handlePrevSearch = (input: string) => {
    setError('');
    setSearchTerm(input);
    setSearchResult(mockWeatherData[searchTerm]);
  };

  return (
    <div
      style={{
        height: 600,
        border: '2px solid red',
      }}
    >
      {/* Search Input */}
      <input
        type="text"
        id="citySearch"
        placeholder="Search for a city..."
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <button id="searchButton" onClick={handleSearch}>
        Search
      </button>

      {/* Weather Data Display */}
      <div id="weatherData">
        {error && <p>{error}</p>}
        {searchResult && !error.length ? (
          <div
            style={{
              border: '2px solid brown',
            }}
          >
            <h2>{searchResult?.humidity}</h2>
            <p>{searchResult.temperature}</p>
            <p>{searchResult.windSpeed}</p>
          </div>
        ) : (
          <div>No cities</div>
        )}
      </div>

      {/* Previous Searches */}
      <div id="previousSearches">
        <h3>Previous Searches:</h3>

        {prevSearch.map((state) => (
          <button onClick={() => handlePrevSearch(state.title as string)}>
            {state.title}
          </button>
        ))}
      </div>
    </div>
  );
}
