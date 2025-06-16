import { Icon, IconName } from "components/icon/Icon";
import "./EmptyState.css";

interface EmptyStateProps {
    type: "no-results" | "empty-search" | "rate-limit";
}

const content = {
    "no-results": {
        icon: "no_result",
        mainLabel: "No results found",
        secondaryLabel: "Try adjusting your search criteria.",
    },
    "empty-search": {
        icon: "magnifying_glass",
        mainLabel: "No search term entered",
        secondaryLabel: "Please enter a keyword to start searching.",
    },
    "rate-limit": {
        icon: "warning",
        mainLabel: "Rate limit exceeded",
        secondaryLabel: "Please wait a moment and try again later.",
    },
};

export default function EmptyState({ type }: EmptyStateProps) {
    const { icon, mainLabel, secondaryLabel } = content[type];

    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Icon name={icon as IconName} />
            </div>
            <div className="empty-state-text">
                <div className="empty-state-main">{mainLabel}</div>
                <div className="empty-state-secondary">{secondaryLabel}</div>
            </div>
        </div>
    );
}
