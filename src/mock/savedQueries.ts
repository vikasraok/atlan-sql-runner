import type { SavedQuery } from "../types";

export const mockSavedQueries: SavedQuery[] = [
  {
    id: '1',
    title: 'All Customers',
    query: 'SELECT * FROM customers ORDER BY created_at DESC;',
    description: 'Fetch all customers sorted by creation date',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'High Value Orders',
    query: 'SELECT o.id, c.name, o.total_amount, o.order_date\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.total_amount > 1000\nORDER BY o.total_amount DESC;',
    description: 'Orders with value greater than $1000',
    createdAt: Date.now()
  },
  {
    id: '3',
    title: 'Monthly Sales Summary',
    query: 'SELECT \n  DATE_FORMAT(order_date, "%Y-%m") as month,\n  COUNT(*) as order_count,\n  SUM(total_amount) as total_sales\nFROM orders \nGROUP BY month \nORDER BY month DESC;',
    description: 'Monthly aggregated sales data',
    createdAt: Date.now()
  },
  {
    id: '4',
    title: 'Product Performance',
    query: 'SELECT \n  p.name,\n  COUNT(oi.product_id) as times_ordered,\n  SUM(oi.quantity) as total_quantity,\n  AVG(oi.price) as avg_price\nFROM products p\nJOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id, p.name\nORDER BY times_ordered DESC;',
    description: 'Product sales performance metrics',
    createdAt: Date.now()
  }
];