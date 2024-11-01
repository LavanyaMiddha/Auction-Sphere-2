import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProductCard from '../components/ProductCard.js'

// Mock axios to avoid actual API calls
jest.mock('axios')
jest.mock('react-toastify', () => ({
    toast: { error: jest.fn() },
}))

// Mock data
const mockProduct = [1, 'Sample Product', 'Lavanya M', 50]
const mockMaxBid = 75
const mockName = 'Jane K'
const mockImageUrl = 'https://example.com/sample-image.jpg'

describe('ProductCard Component', () => {
    beforeEach(() => {
        axios.post.mockClear()
        toast.error.mockClear()
        axios.post.mockResolvedValueOnce({
            data: { result: [mockImageUrl] },
        })
    })

    test('renders product information correctly', () => {
        render(
            <Router>
                <ProductCard
                    product={mockProduct}
                    maxBid={mockMaxBid}
                    name={mockName}
                />
            </Router>
        )

        // Check if product title, seller, minimum price, and max bid are displayed correctly
        expect(screen.getByText('Sample Product')).toBeInTheDocument()
        expect(screen.getByText(/Seller: Lavanya M/i)).toBeInTheDocument()
        expect(screen.getByText(/Minimum price: \$50/i)).toBeInTheDocument()
        expect(
            screen.getByText(/Current highest bids: \$75/i)
        ).toBeInTheDocument()
        expect(
            screen.getByText(/Current highest bidder: Jane K/i)
        ).toBeInTheDocument()
    })

    test('renders "N/A" for max bid if maxBid is -1', () => {
        render(
            <Router>
                <ProductCard
                    product={mockProduct}
                    maxBid={-1}
                    name={mockName}
                />
            </Router>
        )

        expect(
            screen.getByText((content, element) =>
                content.includes('Current highest bids: $N/A')
            )
        ).toBeInTheDocument()
    })
})
