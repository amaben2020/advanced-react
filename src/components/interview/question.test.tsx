import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WeatherDashboard } from './Question';

describe('WeatherDashboard Component', () => {
  it('renders the component correctly', () => {
    render(<WeatherDashboard />);

    // Check if the search input and button are rendered
    expect(
      screen.getByPlaceholderText(/Search for a city/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('displays weather information on valid city search', () => {
    render(<WeatherDashboard />);

    const input = screen.getByPlaceholderText(/Search for a city/i);
    const searchButton = screen.getByText(/Search/i);

    // Simulate typing a city name
    fireEvent.change(input, { target: { value: 'New York' } });
    fireEvent.click(searchButton);

    // Check if the weather data is displayed
    expect(screen.getByText(/22°C/i)).toBeInTheDocument();
    expect(screen.getByText(/56%/i)).toBeInTheDocument();
    expect(screen.getByText(/15 km\/h/i)).toBeInTheDocument();
  });

  it('displays an error when searching for an unknown city', () => {
    render(<WeatherDashboard />);

    const input = screen.getByPlaceholderText(/Search for a city/i);
    const searchButton = screen.getByText(/Search/i);

    // Simulate typing an unknown city name
    fireEvent.change(input, { target: { value: 'Unknown City' } });
    fireEvent.click(searchButton);

    // Check if the error message is displayed
    expect(screen.getByText(/City not found/i)).toBeInTheDocument();
  });

  it('handles previous search retrieval', () => {
    render(<WeatherDashboard />);

    const input = screen.getByPlaceholderText(/Search for a city/i);
    const searchButton = screen.getByText(/Search/i);

    // Simulate a search for 'London'
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    // Check if the previous search button is displayed
    const previousSearchButton = screen.getByText(/London/i);
    expect(previousSearchButton).toBeInTheDocument();

    // Click on the previous search button
    fireEvent.click(previousSearchButton);

    // Ensure the weather data for London is displayed
    expect(screen.getByText(/15°C/i)).toBeInTheDocument();
    expect(screen.getByText(/70%/i)).toBeInTheDocument();
    expect(screen.getByText(/20 km\/h/i)).toBeInTheDocument();
  });
});
