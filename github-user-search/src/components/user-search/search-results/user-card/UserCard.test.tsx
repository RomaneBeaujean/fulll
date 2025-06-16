import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "./UserCard";
import { GithubUser } from "@models/GithubUser";

const mockUser: GithubUser = {
    id: 1,
    login: "testuser",
    avatar_url: "https://example.com/avatar.jpg",
    html_url: "https://github.com/testuser",
};

describe("UserCard", () => {
    it("should display user login and ID", () => {
        render(<UserCard user={mockUser} editable={false} selected={false} handleSelectUser={jest.fn()} />);
        expect(screen.getByText("testuser")).toBeInTheDocument();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
    });

    it("should render the avatar image with correct alt text", () => {
        render(<UserCard user={mockUser} editable={false} selected={false} handleSelectUser={jest.fn()} />);
        const image = screen.getByAltText("testuser's avatar") as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toBe(mockUser.avatar_url);
    });

    it("should render a checkbox when editable is true", () => {
        render(<UserCard user={mockUser} editable={true} selected={false} handleSelectUser={jest.fn()} />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should call handleSelectUser when checkbox is clicked", () => {
        const mockFn = jest.fn();
        render(<UserCard user={mockUser} editable={true} selected={false} handleSelectUser={mockFn} />);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(mockFn).toHaveBeenCalledWith(1);
    });

    it("should have 'selected' class when selected is true", () => {
        const { container } = render(<UserCard user={mockUser} editable={false} selected={true} handleSelectUser={jest.fn()} />);
        expect(container.firstChild).toHaveClass("selected");
    });

    it("should link to the GitHub profile", () => {
        render(<UserCard user={mockUser} editable={false} selected={false} handleSelectUser={jest.fn()} />);
        const link = screen.getByRole("link", { name: "View profile" });
        expect(link).toHaveAttribute("href", mockUser.html_url);
    });
});
