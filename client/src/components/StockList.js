import React, { useState, useEffect } from 'react';
import { fetchStocks } from '../services/api';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchStocks();
        setStocks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stocks');
        setLoading(false);
      }
    };

    getStocks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock._id}>
            {stock.name} ({stock.symbol}): ${stock.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;