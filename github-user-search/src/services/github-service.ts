import { GithubUser } from "@models/GithubUser";

export async function fetchGithubUsers(query: string): Promise<GithubUser[]> {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);

    if (res.status === 403) throw new Error("rate-limit");

    const data = await res.json();
    return data.items || [];
}
