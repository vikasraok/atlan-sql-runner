import type { QueryResult } from '../types';
import {historyMockData} from './historyMockData';

// Generate large dataset for performance testing
export const generateMockData = (rowCount: number = 1000) => {
  const data = [];
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Henry'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  
  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: i, // Ensure unique 'id' property
      first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
      last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `user${i}@example.com`,
      city: cities[Math.floor(Math.random() * cities.length)],
      age: Math.floor(Math.random() * 50) + 20,
      salary: Math.floor(Math.random() * 100000) + 30000,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
      created_at: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
    });
  }
  return data;
};

export const generateLargeMockData = (rowCount: number = 1000000) => {
  const data = [];
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: i,
      first_name: firstNames[i % firstNames.length],
      last_name: lastNames[i % lastNames.length],
      city: cities[i % cities.length],
      age: 20 + (i % 50),
    });
  }
  return {
    columns: ['id', 'first_name', 'last_name', 'city', 'age'],
    data: data
  };
};

export const mockQueryResults: Record<string, QueryResult> = { 
  '1': {
    id: '1',
    query: historyMockData[0].query,
    columns: ['id', 'first_name', 'last_name', 'email', 'city', 'age', 'created_at'],
    result: generateMockData(50),
    executionTime: 120,
    rowCount: 50,
    executedAt: Date.now()
  },
  '2': {
    id: '2',
    query: historyMockData[1].query,
    columns: ['id', 'customer_name', 'total_amount', 'order_date'],
    result: [
      { id: 1001, customer_name: 'Alice Johnson', total_amount: 2500.00, order_date: '2024-01-15' },
      { id: 1002, customer_name: 'Bob Smith', total_amount: 1850.75, order_date: '2024-01-20' },
      { id: 1003, customer_name: 'Charlie Brown', total_amount: 1650.25, order_date: '2024-02-01' },
      { id: 1004, customer_name: 'Diana Wilson', total_amount: 1420.50, order_date: '2024-02-05' },
      { id: 1005, customer_name: 'Eva Martinez', total_amount: 1200.00, order_date: '2024-02-10' }
    ],
    executionTime: 85,
    rowCount: 5,
    executedAt: Date.now()
  },
  '3': {
    id: '3',
    query: historyMockData[2].query,
    columns: ['month', 'order_count', 'total_sales'],
    result: [
      { month: '2024-02', order_count: 145, total_sales: 45600.75 },
      { month: '2024-01', order_count: 132, total_sales: 38950.25 },
      { month: '2023-12', order_count: 178, total_sales: 52300.00 },
      { month: '2023-11', order_count: 156, total_sales: 41200.50 },
      { month: '2023-10', order_count: 134, total_sales: 36800.25 }
    ],
    executionTime: 65,
    rowCount: 5,
    executedAt: Date.now()
  },
  '4': {
    id: '4',
    query: historyMockData[3].query,
    columns: ['name', 'times_ordered', 'total_quantity', 'avg_price'],
    result: [
      { name: 'Wireless Headphones', times_ordered: 89, total_quantity: 156, avg_price: 79.99 },
      { name: 'Smartphone Case', times_ordered: 76, total_quantity: 134, avg_price: 24.99 },
      { name: 'Bluetooth Speaker', times_ordered: 65, total_quantity: 98, avg_price: 49.99 },
      { name: 'USB Cable', times_ordered: 54, total_quantity: 87, avg_price: 12.99 },
      { name: 'Power Bank', times_ordered: 43, total_quantity: 65, avg_price: 34.99 }
    ],
    executionTime: 95,
    rowCount: 5,
    executedAt: Date.now()
  }
};