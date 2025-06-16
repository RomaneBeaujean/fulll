import { GithubUser } from "@models/GithubUser";
import "./UserCard.css";
import Checkbox from "components/checkbox/Checkbox";

export interface UserCardProps {
  user: GithubUser;
  editable: boolean;
  selected: boolean;
  handleSelectUser: (userId: number) => void;
}

export default function UserCard({ user, editable, selected, handleSelectUser }: UserCardProps) {

  return (
    <div className={`user-card ${selected ? "selected" : ""}`} data-testid={`user-${user.id}`}>
      {editable && <div className="user-checkbox">
        <Checkbox checked={selected} onChange={() => handleSelectUser(user.id)} />
      </div>}
      <div className="user">
        <div className="user-avatar">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
        </div>
        <div className="user-info">
          <p className="user-id">ID: {user.id}</p>
          <h3 className="user-login">{user.login}</h3>
        </div>
      </div>
      <div className="user-profile">
        <a
          className="user-profile-link"
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View profile
        </a>
      </div>
    </div>
  )
}
