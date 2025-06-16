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
});
