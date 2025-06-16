import "./UserSearch.css";
import SearchInput from './search-input/SearchInput';
import SearchResults from './search-results/SearchResults';
import EditToolbar from './edit-toolbar/EditToolbar';
import { useEffect, useState } from "react";
import EditModeToggle from "./edit-mode-toggle/EditModeToggle";
import EmptyState from "./empty-state/EmptyState";
import Loader from "./loader/Loader";
import { useGithubUsers } from "../../hooks/useGithubUsers";
import { GithubUser } from "@models/GithubUser";
import { generateNewIds } from "utils/idUtils";

export default function UserSearch() {

  const [editable, setEditable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [localUsers, setLocalUsers] = useState<GithubUser[]>([]);
  const { users, loading, error } = useGithubUsers(searchValue);
  const emptySearchValue = !searchValue.trim();
  const noResults = users.length === 0;
  const renderEditToolbar = editable && !noResults && !error;

  useEffect(() => {
    clearSelectedUsers();
  }, [editable]);


  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  useEffect(() => {
    clearSelectedUsers();
  }, [searchValue])

  const clearSelectedUsers = () => {
    setSelectedUsers([]);
  }

  const getAllUserIds = (users: GithubUser[]) => users.map(user => user.id);

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  }

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => {
      const isAlreadySelected = prev.includes(userId);
      if (isAlreadySelected) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    const allIds = getAllUserIds(localUsers);
    const areAllSelected = selectedUsers.length === allIds.length;
    setSelectedUsers(areAllSelected ? [] : allIds);
  }

  const handleDuplicate = () => {
    setLocalUsers((prevUsers) => {
      const usersToDuplicate = prevUsers.filter(user => selectedUsers.includes(user.id));
      const newIds = generateNewIds(getAllUserIds(prevUsers), usersToDuplicate.length);

      const duplicatedUsers = usersToDuplicate.map((user, index) => ({
        ...user,
        id: newIds[index],
        login: `${user.login}-copy`,
      }));

      return [...prevUsers, ...duplicatedUsers];
    });

    clearSelectedUsers();
  };

  const handleDelete = () => {
    setLocalUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUsers.includes(user.id))
    );
    clearSelectedUsers();
  }

  const renderSearchResults = () => {
    if (loading) return <Loader />;
    const shouldShowEmptyState = error || noResults || emptySearchValue;

    if (shouldShowEmptyState) {
      return <EmptyState type={error || (emptySearchValue ? "empty-search" : "no-results")} />;
    }

    return (
      <SearchResults
        editable={editable}
        users={localUsers}
        selectedUsers={selectedUsers}
        handleSelectUser={handleSelectUser}
      />
    );
  }

  return (
    <div className="user-search">
      <SearchInput handleSearch={handleSearch} typingDelay={500} />
      <EditModeToggle editable={editable} onToggle={() => setEditable(!editable)} />
      {renderEditToolbar && <EditToolbar
        selected={selectedUsers.length}
        total={localUsers.length}
        handleSelectAll={handleSelectAll}
        handleDuplicate={handleDuplicate}
        handleDelete={handleDelete}
      />}
      {renderSearchResults()}
    </div>
  );
}
