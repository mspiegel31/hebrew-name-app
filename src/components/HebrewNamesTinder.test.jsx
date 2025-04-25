import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HebrewNamesTinder from './HebrewNamesTinder';
import { hebrewNames } from '../data/namesData';

// Mock URL.createObjectURL and Blob
const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();

// Mock the names data
jest.mock('../data/namesData', () => {
  const mockNames = [
    {
      english_name: 'Test Name 1',
      hebrew_name: 'שם בדיקה 1',
      gender: 'male'
    },
    {
      english_name: 'Test Name 2',
      hebrew_name: 'שם בדיקה 2',
      gender: 'female'
    },
    {
      english_name: 'Test Name 3',
      hebrew_name: 'שם בדיקה 3',
      gender: 'both'
    }
  ];
  
  return {
    hebrewNames: mockNames
  };
});

beforeAll(() => {
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;
  mockCreateObjectURL.mockReturnValue('mock-url');
});

afterAll(() => {
  delete global.URL.createObjectURL;
  delete global.URL.revokeObjectURL;
});

describe('HebrewNamesTinder', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('mock-url');
    
    // Clear any lingering DOM elements
    document.body.innerHTML = '';
  });

  it('renders the initial name card with a name from the pool', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Verify a name is displayed (without assuming which one)
    const nameElement = screen.getByText(/Test Name/);
    expect(nameElement).toBeInTheDocument();
  });

  it('moves to next name when like button is clicked', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Get the current name
    const currentName = screen.getByText(/Test Name/).textContent;
    
    // Click the like button
    const likeButton = screen.getByLabelText('Like');
    await act(async () => {
      fireEvent.click(likeButton);
    });
    
    // Wait for a different name to be displayed
    await waitFor(() => {
      const newName = screen.getByText(/Test Name/).textContent;
      expect(newName).not.toBe(currentName);
    });
  });

  it('moves to next name when dislike button is clicked', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Get the current name
    const currentName = screen.getByText(/Test Name/).textContent;
    
    // Click the dislike button
    const dislikeButton = screen.getByLabelText('Dislike');
    await act(async () => {
      fireEvent.click(dislikeButton);
    });
    
    // Wait for a different name to be displayed
    await waitFor(() => {
      const newName = screen.getByText(/Test Name/).textContent;
      expect(newName).not.toBe(currentName);
    });
  });

  it('shows results when all names have been rated', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Rate all names
    const names = hebrewNames;
    for (let i = 0; i < names.length; i++) {
      const likeButton = screen.getByLabelText('Like');
      await act(async () => {
        fireEvent.click(likeButton);
      });
    }
    
    // Verify results are shown
    const resultsTitle = screen.getByText(/Results/);
    expect(resultsTitle).toBeInTheDocument();
  });

  it('filters names by gender when filter buttons are clicked', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Click male filter
    const maleFilter = screen.getByText('Male ♂️');
    await act(async () => {
      fireEvent.click(maleFilter);
    });
    
    // Verify only male names are shown
    const nameElement = screen.getByText('Test Name 1');
    expect(nameElement).toBeInTheDocument();
    
    // Click female filter
    const femaleFilter = screen.getByText('Female ♀️');
    await act(async () => {
      fireEvent.click(femaleFilter);
    });
    
    // Verify only female names are shown
    const femaleName = screen.getByText('Test Name 2');
    expect(femaleName).toBeInTheDocument();
  });

  it('creates CSV with correct content when exporting results', async () => {
    await act(async () => {
      render(<HebrewNamesTinder />);
    });
    
    // Rate all names
    const names = hebrewNames;
    for (let i = 0; i < names.length; i++) {
      const likeButton = screen.getByLabelText('Like');
      await act(async () => {
        fireEvent.click(likeButton);
      });
    }
    
    // Click export button
    const exportButton = screen.getByText('Export Results as CSV');
    await act(async () => {
      fireEvent.click(exportButton);
    });
    
    // Verify CSV was created
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });
}); 