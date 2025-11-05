

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


export const generateCustomerData = (rowCount: number = 1000000) => {
  const data = [];
  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: i,
      first_name: `FirstName${i}`,
      last_name: `LastName${i}`,
      email: `customer${i}@example.com`,
      city: `City${i}`,
      created_at: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
    });
  }
  return {
    columns: ['id', 'first_name', 'last_name', 'email', 'city', 'created_at'],
    data: data
  };
};

export const generateOrderData = (rowCount: number = 1000000) => {
  const data = [];
  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: i,
      customer_id: Math.floor(Math.random() * rowCount) + 1,
      total_amount: Math.random() * 1000,
      order_date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
    });
  }
  return {
    columns: ['id', 'customer_id', 'total_amount', 'order_date'],
    data: data
  };
};

export const generateProductData = (rowCount: number = 1000000) => {
  const data = [];
  for (let i = 1; i <= rowCount; i++) {
    data.push({
      id: i,
      name: `Product${i}`,
      price: Math.random() * 100,
      stock: Math.floor(Math.random() * 1000)
    });
  }
  return {
    columns: ['id', 'name', 'price', 'stock'],
    data: data
  };
};

