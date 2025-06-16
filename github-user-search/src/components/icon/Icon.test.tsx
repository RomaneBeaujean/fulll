import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
    it('should render the copy icon with data-name="copy"', () => {
        const { container } = render(<Icon name="copy" />);
        const svg = container.querySelector('svg[data-name="copy"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render the trash icon with data-name="trash"', () => {
        const { container } = render(<Icon name="trash" />);
        const svg = container.querySelector('svg[data-name="trash"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render the warning icon with data-name="warning"', () => {
        const { container } = render(<Icon name="warning" />);
        const svg = container.querySelector('svg[data-name="warning"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render the magnifying_glass icon with data-name="magnifying_glass"', () => {
        const { container } = render(<Icon name="magnifying_glass" />);
        const svg = container.querySelector('svg[data-name="magnifying_glass"]');
        expect(svg).toBeInTheDocument();
    });

    it('should render the no_result icon with data-name="no_result"', () => {
        const { container } = render(<Icon name="no_result" />);
        const svg = container.querySelector('svg[data-name="no_result"]');
        expect(svg).toBeInTheDocument();
    });
});
