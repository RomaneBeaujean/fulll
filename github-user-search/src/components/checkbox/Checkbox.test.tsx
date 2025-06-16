import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
    it('should display the label when provided', () => {
        render(<Checkbox checked={false} label="Sample text" onChange={() => { }} />);
        expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should be checked when the "checked" prop is true', () => {
        render(<Checkbox checked={true} onChange={() => { }} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('should not be checked when the "checked" prop is false', () => {
        render(<Checkbox checked={false} onChange={() => { }} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('should call onChange when clicked', () => {
        const handleChange = jest.fn();
        render(<Checkbox checked={false} onChange={handleChange} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });

    it('should have indeterminate state when "indeterminate" prop is true', () => {
        render(<Checkbox checked={false} indeterminate onChange={() => { }} />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.indeterminate).toBe(true);
    });
});
