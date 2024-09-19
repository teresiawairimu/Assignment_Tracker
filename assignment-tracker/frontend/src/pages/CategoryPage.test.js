import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import act from 'react-dom/test-utils';
import CategoryPage from './CategoryPage';
import * as AuthContext from '../contexts/AuthContext';
import { getCategories, deleteCategory } from '../services/categoryService';
import { getAssignmentsByCategory } from '../services/assignmentService';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../firebaseConfig';

// Mock the dependencies

jest.mock('../services/categoryService');
jest.mock('../services/assignmentService');

jest.spyOn(AuthContext, 'useAuth');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../firebaseConfig');

describe('CategoryPage', () => {
  const mockNavigate = jest.fn();
  const mockCurrentUser = {
    uid: 'testUserId',
    getIdToken: jest.fn().mockResolvedValue('testToken'),
  };

  beforeEach(() => {
    AuthContext.useAuth.mockReturnValue({ currentUser: mockCurrentUser });
    useNavigate.mockReturnValue(mockNavigate);
    getCategories.mockResolvedValue([
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ]);
    getAssignmentsByCategory.mockResolvedValue([
      { id: '1', name: 'Assignment 1' },
      { id: '2', name: 'Assignment 2' },
    ]);
    getAuth.mockReturnValue({
      currentUser: mockCurrentUser,
    });
  });

  test('renders category page with categories', async () => {
    await act(async() => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Category Page')).toBeInTheDocument();
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });
  });

  test('navigates to create category page when create button is clicked', async () => {
    await act(async () => {
      render(<CategoryPage />);
    });
    
    await waitFor(() => {
      const createButton = screen.getByText('Create');
      fireEvent.click(createButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/category/create');
  });

  test('shows assignments when View Assignments button is clicked', async () => {
    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      const viewAssignmentsButton = screen.getAllByText('View Assignments')[0];
      fireEvent.click(viewAssignmentsButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Assignments in selected category')).toBeInTheDocument();
      expect(screen.getByText('Assignment 1')).toBeInTheDocument();
      expect(screen.getByText('Assignment 2')).toBeInTheDocument();
    });
  });

  test('deletes category when delete button is clicked and confirmed', async () => {
    window.confirm = jest.fn(() => true);
    deleteCategory.mockResolvedValue();

    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(deleteCategory).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    getCategories.mockReturnValueOnce(new Promise( async () => {})); // Never resolves
    act(() => {
      render(<CategoryPage />);
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error state', async () => {
    getCategories.mockRejectedValueOnce(new Error('Failed to fetch'));
    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch categories. Please try again later')).toBeInTheDocument();
    });
  });

  test('shows message when no assignments are found', async () => {
    getAssignmentsByCategory.mockResolvedValueOnce([]);

    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      const viewAssignmentsButton = screen.getAllByText('View Assignments')[0];
      fireEvent.click(viewAssignmentsButton);
    });

    await waitFor(() => {
      expect(screen.getByText('No assignments found for this category')).toBeInTheDocument();
    });
  });
});