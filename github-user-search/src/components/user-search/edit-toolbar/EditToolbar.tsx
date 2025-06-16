import Checkbox from "components/checkbox/Checkbox";
import { Icon } from "../../icon/Icon";
import "./EditToolbar.css";

export interface EditToolbarProps {
    selected: number;
    total: number;
    handleSelectAll: () => void;
    handleDuplicate: () => void;
    handleDelete: () => void;
}

export default function EditToolbar({
    selected,
    total,
    handleSelectAll,
    handleDuplicate,
    handleDelete,
}: EditToolbarProps) {
    const isChecked = selected > 0 && selected === total;
    const isIndeterminate = selected > 0 && selected < total;
    const label = `${selected} item${selected === 1 ? '' : 's'} selected`;

    return (
        <div className="edit-toolbar" data-testid="edit-toolbar">
            <Checkbox
                checked={isChecked}
                onChange={handleSelectAll}
                indeterminate={isIndeterminate}
                label={label}
            />
            <div className="edit-toolbar-actions">
                <button
                    className="icon-action"
                    onClick={handleDuplicate}
                    title="Duplicate"
                    aria-label="Duplicate"
                    type="button"
                    data-testid="duplicate-button"
                >
                    <Icon name="copy" />
                </button>
                <button
                    className="icon-action"
                    onClick={handleDelete}
                    title="Delete"
                    aria-label="Delete"
                    type="button"
                    data-testid="delete-button"
                >
                    <Icon name="trash" />
                </button>
            </div>
        </div>
    );
}
