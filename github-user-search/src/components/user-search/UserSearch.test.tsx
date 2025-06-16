import { fireEvent, render, screen } from "@testing-library/react";
import UserSearch from "./UserSearch";
import { useGithubUsers } from "../../hooks/useGithubUsers";
import { GithubUser } from "../../models/GithubUser";
import { SearchResultsProps } from "./search-results/SearchResults";
import { EditModeToggleProps } from "./edit-mode-toggle/EditModeToggle";
import { EditToolbarProps } from "./edit-toolbar/EditToolbar";

jest.mock("./search-input/SearchInput", () => ({ handleSearch }: any) => {
    return (
        <input
            data-testid="search-input"
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
});

jest.mock("./empty-state/EmptyState", () => ({ type }: any) => (
    <div data-testid="empty-state">Empty state: {type}</div>
));

export const mockSearchResults = jest.fn();

jest.mock("./search-results/SearchResults", () => (props: SearchResultsProps) => {
    mockSearchResults(props);
    return (
        <div data-testid="search-results">
            {props.users.map((user) => (
                <div key={user.id} data-testid={`user-${user.id}`} title="user">
                    {user.login}
                </div>
            ))}
        </div>
    );
});

jest.mock("./edit-mode-toggle/EditModeToggle", () => ({ editable, onToggle }: EditModeToggleProps) => (
    <label>
        <input
            type="checkbox"
            data-testid="edit-mode-toggle"
            aria-checked={editable}
            checked={editable}
            onChange={onToggle}
        />
        Edit Mode
    </label>
));

jest.mock("./loader/Loader", () => () => <div data-testid="loader">Loading...</div>);

jest.mock("./edit-toolbar/EditToolbar", () => ({
    selected,
    total,
    handleSelectAll,
    handleDuplicate,
    handleDelete,
}: EditToolbarProps) => (
    <div data-testid="edit-toolbar">
        <label>
            <input
                data-testid="edit-toolbar-checkbox"
                type="checkbox"
                checked={selected === total && total > 0}
                onChange={handleSelectAll}
            />
            Checkbox
        </label>
        <button data-testid="duplicate" onClick={handleDuplicate}>
            Duplicate
        </button>
        <button data-testid="delete" onClick={handleDelete}>
            Delete
        </button>
    </div>
));

jest.mock("../../hooks/useGithubUsers");
const mockedUseGithubUsers = useGithubUsers as jest.MockedFunction<typeof useGithubUsers>;

beforeEach(() => {
    jest.clearAllMocks();
    mockSearchResults.mockClear();
    mockedUseGithubUsers.mockReturnValue({
        users: [],
        loading: false,
        error: null,
    });
});

const fakeUsers: GithubUser[] = [
    { id: 1, login: "romane_1", avatar_url: "url1", html_url: "htmlUrl1" },
    { id: 2, login: "romane_2", avatar_url: "url2", html_url: "htmlUrl2" },
];

function setupWithUserResults() {
    mockedUseGithubUsers.mockReturnValue({
        users: fakeUsers,
        loading: false,
        error: null,
    });
    render(<UserSearch />);
    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "romane" } });
}

function enableEdition() {
    fireEvent.click(screen.getByTestId("edit-mode-toggle"));
}

function clickOnToolbarCheckbox() {
    fireEvent.click(screen.getByTestId("edit-toolbar-checkbox"));
}


describe("UserSearch", () => {
    it("should display SearchInput component", () => {
        render(<UserSearch />);
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("should display EmptyState component with 'empty-search' type when no input", () => {
        render(<UserSearch />);
        expect(screen.getByTestId("empty-state")).toBeInTheDocument();
        expect(screen.getByText("Empty state: empty-search")).toBeInTheDocument();
    });

    it("should display EmptyState component with 'rate-limit' type when useGithubUsers returns an error", () => {
        mockedUseGithubUsers.mockReturnValue({
            users: [],
            loading: false,
            error: "rate-limit",
        });
        render(<UserSearch />);
        expect(screen.getByTestId("empty-state")).toHaveTextContent("Empty state: rate-limit");
    });

    it("should display Loader component when useGithubUsers returns loading: true", () => {
        mockedUseGithubUsers.mockReturnValue({
            users: [],
            loading: true,
            error: null,
        });
        render(<UserSearch />);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("should render users through SearchResults component when input has value & useGithubUsers returns users", () => {
        mockedUseGithubUsers.mockReturnValue({
            users: fakeUsers,
            loading: false,
            error: null,
        });
        render(<UserSearch />);
        expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();;
        fireEvent.change(screen.getByTestId("search-input"), {
            target: { value: "romane" },
        });
        expect(screen.getByTestId("search-results")).toBeInTheDocument();
        expect(screen.getByTestId("user-1")).toBeInTheDocument();
        expect(screen.getByTestId("user-2")).toBeInTheDocument();
    });

    it("should render EditModeToggle component", () => {
        mockedUseGithubUsers.mockReturnValue({
            users: fakeUsers,
            loading: false,
            error: null,
        });
        render(<UserSearch />);
        expect(screen.getByTestId("edit-mode-toggle")).toBeInTheDocument();
    });

    it("should render EditToolbar when set editable mode", () => {
        mockedUseGithubUsers.mockReturnValue({
            users: fakeUsers,
            loading: false,
            error: null,
        });
        render(<UserSearch />);
        enableEdition();
        expect(screen.getByTestId("edit-toolbar")).toBeInTheDocument();
    });

    it("should select all users when click on EditToolbar checkbox", () => {
        setupWithUserResults();
        enableEdition();
        clickOnToolbarCheckbox();
        expect(screen.getByTestId("search-results")).toBeInTheDocument();
        const lastCallProps = mockSearchResults.mock.calls.at(-1)?.[0];
        expect(lastCallProps.selectedUsers).toEqual(fakeUsers.map((user) => user.id));
    });

    it("should duplicate selected users when handleDuplicate is triggered", () => {
        setupWithUserResults();
        enableEdition();
        clickOnToolbarCheckbox();
        expect(screen.getByTestId("search-results")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("duplicate"));
        const allUserDivs = screen.getAllByTitle("user");
        expect(allUserDivs.length).toEqual(fakeUsers.length * 2);
    });

    it("should delete selected users when handleDelete is triggered", () => {
        setupWithUserResults();
        enableEdition();
        clickOnToolbarCheckbox();
        expect(screen.getByTestId("search-results")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("delete"));
        const allUserDivs = screen.queryAllByTitle("user");
        expect(allUserDivs.length).toEqual(0);
    });
});