import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogInPage from './LogInPage';
import { BrowserRouter as Router } from 'react-router-dom'; 


jest.mock('../firebaseConfig', () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} }, 
  }),
}));


const renderWithRouter = (component) => {
  return render(
    <Router>
      {component}
    </Router>
  );
};

describe('LogInPage', () => {
  test('renders the login form with email and password inputs', () => {
    renderWithRouter(<LogInPage />);

    // Check if the page title is rendered
    const pageTitle = screen.getByRole('heading', {name: /login/i});
    expect(pageTitle).toBeInTheDocument();

    // Check if email input is rendered
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // Check if password input is rendered
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('renders the login button', () => {
    renderWithRouter(<LogInPage />);

    // Check if the login button is rendered
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass('w-100');
  });

  test('renders a link to the registration page', () => {
    renderWithRouter(<LogInPage />);

    // Check if the registration link is rendered
    const registerLink = screen.getByText(/register/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
