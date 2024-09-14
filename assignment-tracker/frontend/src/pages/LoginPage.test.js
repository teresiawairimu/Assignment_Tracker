// LogInPage.test.js
import { render, screen } from '@testing-library/react';
import LogInPage from './LogInPage';
import { BrowserRouter as Router } from 'react-router-dom'; // Required for Link components

// Wrapper for rendering components with Router
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
    const pageTitle = screen.getByText(/login/i);
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
