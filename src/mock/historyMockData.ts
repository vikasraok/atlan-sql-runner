// Mock data for history
export const historyMockData = [
  {
    query: "SELECT * FROM users WHERE age > 30;",
    resultRows: 120,
    executor: "John Doe",
    dateExecuted: "2025-11-01",
  },
  {
    query: "INSERT INTO orders (user_id, product_id) VALUES (1, 2);",
    resultRows: 1,
    executor: "Jane Smith",
    dateExecuted: "2025-11-02",
  },
  // Add more mock data as needed
];