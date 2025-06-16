import { GithubUser } from "@models/GithubUser";
import "./SearchResults.css";
import UserCard from "./user-card/UserCard";

export interface SearchResultsProps {
  users: GithubUser[];
  selectedUsers: number[];
  editable: boolean;
  handleSelectUser: (userId: number) => void;
}

export default function SearchResults({ editable, users, selectedUsers, handleSelectUser }: SearchResultsProps) {
  return (
    <div className="search-results">
      {users.map((user) => <UserCard
        key={user.id}
        user={user}
        editable={editable}
        selected={selectedUsers.includes(user.id)}
        handleSelectUser={handleSelectUser}
      />)}
    </div>
  )
}
