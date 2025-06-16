import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
    it('should render no-results state with correct texts and icon', () => {
        const { container } = render(<EmptyState type="no-results" />);

        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(screen.getByText('Try adjusting your search criteria.')).toBeInTheDocument();

        const svg = container.querySelector('svg[data-name="no_result"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render empty-search state with correct texts and icon', () => {
        const { container } = render(<EmptyState type="empty-search" />);

        expect(screen.getByText('No search term entered')).toBeInTheDocument();
        expect(screen.getByText('Please enter a keyword to start searching.')).toBeInTheDocument();

        const svg = container.querySelector('svg[data-name="magnifying_glass"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render rate-limit state with correct texts and icon', () => {
        const { container } = render(<EmptyState type="rate-limit" />);

        expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument();
        expect(screen.getByText('Please wait a moment and try again later.')).toBeInTheDocument();

        const svg = container.querySelector('svg[data-name="warning"]');
        expect(svg).toBeInTheDocument();
    });
});
