import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { GithubUser } from "@models/GithubUser";

const mockUsers: GithubUser[] = [
    { id: 1, login: "alice", avatar_url: "url1", html_url: "profile1" },
    { id: 2, login: "bob", avatar_url: "url2", html_url: "profile2" },
];

describe("SearchResults", () => {
    it("should render a UserCard for each user", () => {
        render(
            <SearchResults
                users={mockUsers}
                editable={false}
                selectedUsers={[]}
                handleSelectUser={jest.fn()}
            />
        );
        expect(screen.getByText("alice")).toBeInTheDocument();
        expect(screen.getByText("bob")).toBeInTheDocument();
    });

    it("should pass the correct selected status to each UserCard", () => {
        const { container } = render(
            <SearchResults
                users={mockUsers}
                editable={true}
                selectedUsers={[2]}
                handleSelectUser={jest.fn()}
            />
        );
        const selectedCards = container.querySelectorAll(".user-card.selected");
        expect(selectedCards.length).toBe(1);
        expect(selectedCards[0]).toHaveTextContent("bob");
    });
});
