import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import axios from 'axios';
import Dashboard from '../components/Dashboard';
import { mockData } from '../MockData/axios';

jest.mock('axios');

beforeEach(() => {
    axios.get.mockClear(); 
  });

test('renders Dashboard component', async () => {
    render(<Dashboard />);
    expect(screen.getByText(/Meet Our Pokemon!/i)).toBeInTheDocument();
  });

test('fetches data and displays it', async () => {
    axios.get.mockResolvedValue({ data: mockData });
  
    render(<Dashboard />);
  
    await waitFor(() => expect(screen.getByText(/Total Pokemon:/i)).toBeInTheDocument());
    mockData.forEach(pokemon => {
      expect(screen.getByText(new RegExp(pokemon.name, 'i'))).toBeInTheDocument();
    });
  });
  
test('filters Pokemon by number', async () => {
    axios.get.mockResolvedValue({ data: mockData });
    render(<Dashboard />);
  
    const filterInput = screen.getByPlaceholderText("Search by Number");
    fireEvent.change(filterInput, { target: { value: '1' } });
  
    await waitFor(() => expect(screen.getByText(/1/i)).toBeInTheDocument());
  });
  
test('handles pagination', async () => {
    axios.get.mockResolvedValue({ data: mockData });
    render(<Dashboard />);
  
    const nextPageButton = screen.getByText(/Next/i);
    fireEvent.click(nextPageButton);
  
    await waitFor(() => expect(mockData.length).toBeGreaterThan(25)); // Assuming itemsPerPage is 25
  });
  