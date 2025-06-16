import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from './SearchInput';

jest.useFakeTimers();

describe('SearchInput', () => {
    it('should render input with correct placeholder label', () => {
        const handleSearch = jest.fn();
        render(<SearchInput handleSearch={handleSearch} typingDelay={500} />);
        expect(screen.getByPlaceholderText('User name')).toBeInTheDocument();
    });

    it('should call handleSearch with debounced input value', async () => {
        const handleSearch = jest.fn();
        render(<SearchInput handleSearch={handleSearch} typingDelay={500} />);
        const input = screen.getByPlaceholderText('User name');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleSearch).not.toHaveBeenCalled();
        jest.advanceTimersByTime(500);
        await waitFor(() => {
            expect(handleSearch).toHaveBeenCalledWith('test');
        });
    });
});
