import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'
import { element } from 'prop-types'

test('renders  Footer', () => {
    render(<Footer />)
    const footer_content = screen.getByText(
        (content, element) =>
            content.startsWith(
                'One stop portal for auctioning and selling items'
            ) && content.endsWith('Prathamesh Thakur.')
    )
    expect(footer_content).toBeInTheDocument()
})
