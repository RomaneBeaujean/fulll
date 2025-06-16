import { renderHook, waitFor } from "@testing-library/react";
import { useGithubUsers } from "./useGithubUsers";
import * as githubService from "services/github-service";
import { GithubUser } from "@models/GithubUser";

jest.mock("services/github-service");

const mockFetchGithubUsers = githubService.fetchGithubUsers as jest.MockedFunction<typeof githubService.fetchGithubUsers>;

describe("useGithubUsers", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return empty users and no loading or error when query is empty", () => {
        const { result } = renderHook(() => useGithubUsers(""));

        expect(result.current).toEqual({
            users: [],
            loading: false,
            error: null,
        });
    });

    it("should set loading true initially and then set users on success", async () => {
        const fakeUsers: GithubUser[] = [
            { id: 1, login: "user1", avatar_url: "", html_url: "" },
        ];
        mockFetchGithubUsers.mockResolvedValueOnce(fakeUsers);

        const { result } = renderHook(() => useGithubUsers("react"));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        // wait until users are loaded (loading = false)
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeNull();
        expect(result.current.users).toEqual(fakeUsers);
    });

    it("should set error 'rate-limit' when fetchGithubUsers rejects with rate-limit error", async () => {
        mockFetchGithubUsers.mockRejectedValueOnce(new Error("rate-limit"));

        const { result } = renderHook(() => useGithubUsers("react"));

        expect(result.current.loading).toBe(true);

        // wait until users are loaded (loading = false)
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("rate-limit");
        expect(result.current.users).toEqual([]);
    });
});
