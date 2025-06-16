import "./EditModeToggle.css";

export interface EditModeToggleProps {
    editable: boolean;
    onToggle: () => void;
}

export default function EditModeToggle({ editable, onToggle }: EditModeToggleProps) {
    return (
        <div className="edit-mode-toggle">
            <label className="switch-container" data-testid="edit-mode-checkbox">
                <input type="checkbox" checked={editable} onChange={onToggle} />
                <span className="slider"></span>
                <span className="switch-label">{editable ? 'Edit mode enabled' : 'Edit mode disabled'}</span>
            </label>
        </div>
    );
}
