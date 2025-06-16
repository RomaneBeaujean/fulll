import { fetchGithubUsers } from "./github-service";

global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;

describe('fetchGithubUsers', () => {
    beforeEach(() => {
        mockedFetch.mockClear();
    });

    it('should returns user list from API', async () => {
        mockedFetch.mockResolvedValueOnce({
            status: 200,
            json: async () => ({
                items: [{ id: 1, login: 'romane', avatar_url: '', html_url: '' }],
            }),
        });

        const users = await fetchGithubUsers('romane');
        expect(users).toHaveLength(1);
        expect(users[0].login).toBe('romane');
    });

    it('should throws error on rate-limit', async () => {
        mockedFetch.mockResolvedValueOnce({
            status: 403,
            json: async () => ({}),
        });

        await expect(fetchGithubUsers('test')).rejects.toThrow('rate-limit');
    });

    it('should returns empty array on empty items', async () => {
        mockedFetch.mockResolvedValueOnce({
            status: 200,
            json: async () => ({ items: [] }),
        });

        const users = await fetchGithubUsers('unknown');
        expect(users).toEqual([]);
    });
});
