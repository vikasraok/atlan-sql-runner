# Atlan SQL Runner

Atlan SQL Runner is a React-based application built with TypeScript and Vite. It provides a user-friendly interface for executing SQL queries, managing query history, and viewing results in real-time.

## Features

- **SQL Editor**: Write and execute SQL queries with basic syntax validation.
- **Query History**: View and manage previously executed queries, the results are not populated in this version.
- **Localization**: Multi-language support using a localization context.
- **Mock Data**: Simulate query results for testing purposes.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vikasraok/atlan-sql-runner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd atlan-sql-runner
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000`.

### Build

To create a production build:

```bash
npm run build
# or
yarn build
```

### Testing

Run unit and integration tests:

```bash
npm run test
# or
yarn test
```

## Folder Structure

- `src/components`: React components for the application.
- `src/contexts`: Context providers for state management and localization.
- `src/hooks`: Custom hooks for reusable logic.
- `src/locales`: Localization files.
- `src/mock`: Mock data for testing.
- `src/test`: Unit and integration tests.
- `src/types`: TypeScript type definitions.

## Libraries Used

### Core Libraries

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: For fast development and build tooling.

### Additional Libraries

- **ESLint**: For linting and enforcing code quality.
- **Vitest**: For unit and integration testing.
- **SlickGrid**: For advanced table management and rendering large datasets efficiently.

## License

This project is licensed under the MIT License.
