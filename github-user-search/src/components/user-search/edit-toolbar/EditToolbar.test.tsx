import { render, screen, fireEvent } from '@testing-library/react';
import EditToolbar from './EditToolbar';

describe('EditToolbar', () => {
    it('should show "0 items selected" when zero items are selected', () => {
        render(
            <EditToolbar
                selected={0}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        expect(screen.getByText('0 items selected')).toBeInTheDocument();
    });

    it('should show "1 item selected" when one item is selected', () => {
        render(
            <EditToolbar
                selected={1}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        expect(screen.getByText('1 item selected')).toBeInTheDocument();
    });

    it('should show "2 items selected" when multiple items are selected', () => {
        render(
            <EditToolbar
                selected={2}
                total={5}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        expect(screen.getByText('2 items selected')).toBeInTheDocument();
    });

    it('should check the checkbox when all items are selected', () => {
        render(
            <EditToolbar
                selected={3}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('should set checkbox as indeterminate when some items are selected', () => {
        render(
            <EditToolbar
                selected={1}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.indeterminate).toBe(true);
    });

    it('should call handleSelectAll when checkbox is clicked', () => {
        const handleSelectAll = jest.fn();
        render(
            <EditToolbar
                selected={0}
                total={3}
                handleSelectAll={handleSelectAll}
                handleDuplicate={() => { }}
                handleDelete={() => { }}
            />
        );
        fireEvent.click(screen.getByRole('checkbox'));
        expect(handleSelectAll).toHaveBeenCalled();
    });

    it('should call handleDuplicate when duplicate button is clicked', () => {
        const handleDuplicate = jest.fn();
        render(
            <EditToolbar
                selected={1}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={handleDuplicate}
                handleDelete={() => { }}
            />
        );
        fireEvent.click(screen.getByRole('button', { name: 'Duplicate' }));
        expect(handleDuplicate).toHaveBeenCalled();
    });

    it('should call handleDelete when delete button is clicked', () => {
        const handleDelete = jest.fn();
        render(
            <EditToolbar
                selected={1}
                total={3}
                handleSelectAll={() => { }}
                handleDuplicate={() => { }}
                handleDelete={handleDelete}
            />
        );
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(handleDelete).toHaveBeenCalled();
    });
});
