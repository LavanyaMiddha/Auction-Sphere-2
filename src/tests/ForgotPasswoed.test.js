import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ForgotPassword from 'component/LoginSignup/ForgotPassword'
import { BrowserRouter } from 'react-router-dom'

test('renders Forgot Password component', () => {
    render(
        <BrowserRouter>
            <ForgotPassword />
        </BrowserRouter>
    )

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(
        screen.getByRole('button', { name: /Send Reset Link/i })
    ).toBeInTheDocument()
})

test('submits forgot password form', async () => {
    render(
        <BrowserRouter>
            <ForgotPassword />
        </BrowserRouter>
    )

    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button', {
        name: /Send Reset Link/i,
    })

    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } })
    fireEvent.click(submitButton)

    expect(
        await screen.findByText(/Reset token sent to your email/i)
    ).toBeInTheDocument()
})

test('shows error for non-existing email', async () => {
    render(<ForgotPassword />)

    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'notfound@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }))

    expect(await screen.findByText(/Email not found/i)).toBeInTheDocument()
})

test('shows error for invalid email format', async () => {
    render(<ForgotPassword />)

    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'invalid-email' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }))

    expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument()
})
