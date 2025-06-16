// hooks/useGithubUsers.ts
import { useEffect, useState } from "react";
import { GithubUser } from "@models/GithubUser";
import { fetchGithubUsers } from "services/github-service";

export type UseGithubUsersReturn = {
    users: GithubUser[];
    loading: boolean;
    error: "rate-limit" | null;
};

export function useGithubUsers(query: string): UseGithubUsersReturn {
    const [users, setUsers] = useState<GithubUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<"rate-limit" | null>(null);

    useEffect(() => {
        const isEmptyQuery = query.trim().length === 0;
        if (isEmptyQuery) {
            setUsers([]);
            return;
        }

        setLoading(true);
        setError(null);

        fetchGithubUsers(query)
            .then(setUsers)
            .catch((err) => {
                if (err.message === "rate-limit") {
                    setError("rate-limit");
                }
            })
            .finally(() => setLoading(false));
    }, [query]);

    return { users, loading, error };
}
