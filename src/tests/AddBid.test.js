import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import AddBid from '../components/AddBid.js'
import '@testing-library/jest-dom/extend-expect'
import { URL } from '../global'

jest.mock('axios')
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}))

describe('AddBid Component', () => {
    const mockProductId = 1
    const mockSellerEmail = 'seller@example.com'
    const mockBidAmount = '50'

    beforeEach(() => {
        localStorage.setItem('email', 'user@example.com') // Mock the logged-in user email
    })
    beforeAll(() => {
        delete window.location // Remove the original location object
        window.location = { reload: jest.fn() } // Mock the reload method
    })

    afterEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    })

    test('renders AddBid component correctly', () => {
        render(
            <AddBid productId={mockProductId} sellerEmail={mockSellerEmail} />
        )

        expect(
            screen.getByText(`Add a bid for product ${mockProductId}`)
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('Enter your bid amount here')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /submit/i })
        ).toBeInTheDocument()
    })

    test('updates amount input when user bids', () => {
        render(
            <AddBid productId={mockProductId} sellerEmail={mockSellerEmail} />
        )

        const input = screen.getByPlaceholderText('Enter your bid amount here')
        fireEvent.change(input, { target: { value: mockBidAmount } })

        expect(input.value).toBe(mockBidAmount)
    })

    test('displays error toast if user tries to bid on own product', () => {
        localStorage.setItem('email', mockSellerEmail) // Mock seller as logged-in user

        render(
            <AddBid productId={mockProductId} sellerEmail={mockSellerEmail} />
        )

        fireEvent.change(
            screen.getByPlaceholderText('Enter your bid amount here'),
            { target: { value: mockBidAmount } }
        )
        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(toast.error).toHaveBeenCalledWith(
            'Cannot bid on your own product!'
        )
    })

    test('displays error toast if user tries to bid on own product', () => {
        localStorage.setItem('email', mockSellerEmail) // Mock seller as logged-in user

        render(
            <AddBid productId={mockProductId} sellerEmail={mockSellerEmail} />
        )

        fireEvent.change(
            screen.getByPlaceholderText('Enter your bid amount here'),
            { target: { value: mockBidAmount } }
        )
        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(toast.error).toHaveBeenCalledWith(
            'Cannot bid on your own product!'
        )
    })
})
