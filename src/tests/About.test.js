import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import About from '../components/About.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

describe('About Component', () => {
    test('renders welcome text', () => {
        render(<About />)
        expect(
            screen.getByText('Welcome to Auction-Sphere!')
        ).toBeInTheDocument()
    })

    test('renders product images', () => {
        render(<About />)
        const images = screen.getAllByRole('img')
        expect(images.length).toBeGreaterThanOrEqual(7) // Assuming you have at least 7 images
    })

    test('renders About Us section', () => {
        render(<About />)
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(
            screen.getByText(
                (content, element) =>
                    content.startsWith('How does it Work?') &&
                    element.tagName.toLowerCase() === 'h3'
            )
        ).toBeInTheDocument()
    })

    test('renders first tag line', () => {
        render(<About />)
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(
            screen.getByText(
                (content, element) =>
                    content.startsWith(
                        'One-stop shop for your favourite items'
                    ) && element.tagName.toLowerCase() === 'p'
            )
        ).toBeInTheDocument()
    })

    test('renders second tag line', () => {
        render(<About />)
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(
            screen.getByText(
                (content, element) =>
                    content.endsWith(
                        'Bid for exciting items and grab your favourite!'
                    ) && element.tagName.toLowerCase() === 'p'
            )
        ).toBeInTheDocument()
    })
})
