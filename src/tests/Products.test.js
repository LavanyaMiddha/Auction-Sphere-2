import { render, screen, waitFor } from '@testing-library/react'
import Products from '../components/Products.js'
import axios from 'axios'
import { toast } from 'react-toastify'

// Mock dependencies
jest.mock('axios')
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}))

describe('Products Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('fetches and displays products successfully', async () => {
        // Mock API response data
        const mockData = {
            data: {
                products: [
                    [1, 'Chair', 'Lavanya', 100],
                    [2, 'Couch', 'Alex', 150],
                ],
                maximumBids: [110, 160],
                names: ['Nancy', 'Sophia'],
            },
        }
        axios.get.mockResolvedValueOnce(mockData)

        render(<Products />)

        // Wait for API data to load and check if ProductCard components are displayed
        await waitFor(() => {
            expect(screen.getByText('Chair')).toBeInTheDocument()
            expect(screen.getByText('Couch')).toBeInTheDocument()
            expect(screen.getByText('Seller: Lavanya')).toBeInTheDocument()
        })
    })

    test('displays error toast if API call fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('API call failed'))

        render(<Products />)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Something went wrong')
        })
    })

    test('displays "No products found" when apiData is empty', async () => {
        // Mock empty data response
        const mockData = { data: { products: [], maximumBids: [], names: [] } }
        axios.get.mockResolvedValueOnce(mockData)

        render(<Products />)

        await waitFor(() => {
            expect(screen.getByText('No products found')).toBeInTheDocument()
        })
    })
})
