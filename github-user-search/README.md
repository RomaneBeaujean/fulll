# Github User Search

A React app to search GitHub users

## Features

- Search GitHub users by username (via `useGithubUsers` custom hook).
- Display search results with user info.
- Edit mode to select multiple users.
- Bulk actions: select all, duplicate selected users, delete selected users.
- Handles loading state, empty search, and GitHub API rate-limit errors.

## Tech Stack

- React (with hooks)
- TypeScript
- Jest + React Testing Library for tests
- Custom hooks for GitHub API interaction
- Mocked components for isolated unit tests

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
```

### Run the app

```bash
npm start
# or
yarn start
```

### Run tests

```bash
npm test
# or
yarn test
```
