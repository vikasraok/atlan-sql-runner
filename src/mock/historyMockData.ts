import type { SQLStatusValues, HistoryItem} from '../types';
import { generateCustomerData, generateOrderData, generateProductData } from './data';

export const mockMap = new Map<string, () => { columns: string[]| undefined; data: { [key: string]: unknown }[] }>();

export const initializeMockMap = () => {
  mockMap.set('1001', generateCustomerData);
  mockMap.set('1002', generateOrderData);
  mockMap.set('1003', generateProductData);
};


export const historyMockData: Array<HistoryItem> = [
  {
    id: '1001',
    query: 'SELECT * FROM customers ORDER BY created_at DESC;',
    result: null,
    executedAt: new Date().toISOString().split('T')[0],
    executionTime: 120,
    executor: 'Admin',
    rowCount: 50,
    status: 'SUCCESS' as SQLStatusValues
  },
  {
    id: '1002',
    query: 'SELECT o.id, c.name, o.total_amount, o.order_date\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.total_amount > 1000\nORDER BY o.total_amount DESC;',
    result: null,
    executedAt: new Date().toISOString().split('T')[0],
    executionTime: 85,
    executor: 'Admin',
    rowCount: 5,
    status: 'SUCCESS' as SQLStatusValues
  },
  {
    id: '1003',
    query: 'SELECT \n  p.name,\n  COUNT(oi.product_id) as times_ordered,\n  SUM(oi.quantity) as total_quantity,\n  AVG(oi.price) as avg_price\nFROM products p\nJOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id, p.name\nORDER BY times_ordered DESC;',
    result: null,
    executedAt: new Date().toISOString().split('T')[0],
    executionTime: 95,
    executor: 'Admin',
    rowCount: 5,
    status: 'SUCCESS' as SQLStatusValues
  }
];