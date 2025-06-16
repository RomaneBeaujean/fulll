import { render, screen } from '@testing-library/react';
import Header from './Header';

describe("Header", () => {
  it('should renders header text', () => {
    render(<Header />);
    expect(screen.getByText('Github Search')).toBeInTheDocument();
  });
});
