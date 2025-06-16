import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModeToggle from './EditModeToggle';

describe('EditModeToggle', () => {
    it('should display "Edit mode enabled" when editable is true', () => {
        render(<EditModeToggle editable={true} onToggle={() => { }} />);
        expect(screen.getByText('Edit mode enabled')).toBeInTheDocument();
    });

    it('should display "Edit mode disabled" when editable is false', () => {
        render(<EditModeToggle editable={false} onToggle={() => { }} />);
        expect(screen.getByText('Edit mode disabled')).toBeInTheDocument();
    });

    it('should render checkbox as checked when editable is true', () => {
        render(<EditModeToggle editable={true} onToggle={() => { }} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('should render checkbox as unchecked when editable is false', () => {
        render(<EditModeToggle editable={false} onToggle={() => { }} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('should call onToggle when checkbox is clicked', () => {
        const handleToggle = jest.fn();
        render(<EditModeToggle editable={false} onToggle={handleToggle} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleToggle).toHaveBeenCalled();
    });
});
