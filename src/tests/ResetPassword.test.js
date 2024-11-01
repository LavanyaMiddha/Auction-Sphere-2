import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from '../ResetPassword';
import { BrowserRouter } from 'react-router-dom';

test('renders Reset Password component', () => {
    render(
        <BrowserRouter>
            <ResetPassword />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
});

test('submits reset password form', async () => {
    render(
        <BrowserRouter>
            <ResetPassword />
        </BrowserRouter>
    );

    const newPasswordInput = screen.getByLabelText(/New Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: /Reset Password/i });

    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword@123' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Password reset successful/i)).toBeInTheDocument();
});

test('shows error if passwords do not match', async () => {
    render(<ResetPassword />);

    fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'NewPassword@123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'MismatchPassword@123' } });
    fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
});

test('shows error if token is invalid or expired', async () => {
    render(<ResetPassword />);

    fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'NewPassword@123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NewPassword@123' } });
    fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

    expect(await screen.findByText(/Invalid or expired token/i)).toBeInTheDocument();
});

