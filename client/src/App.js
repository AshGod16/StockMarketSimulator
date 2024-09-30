// import React from 'react';
import StockList from './components/StockList';

import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Input } from '@/components/ui/input';
// import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Container, Grid, Paper, Typography, TextField, List, ListItem, ListItemText, Button } from '@mui/material';

const sampleStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 145.52, change: 1.24 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2356.85, change: -12.36 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3206.22, change: 24.57 },
  // Add more sample stocks
];

const samplePortfolio = [
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: 100, price: 145.52 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 20, price: 2356.85 },
  // Add more sample portfolio holdings  
];

const sampleStockData = [
  { date: '2023-01-01', price: 140.25 },
  { date: '2023-02-01', price: 143.65 },
  { date: '2023-03-01', price: 138.90 },
  // Add more sample stock price data
];

function App() {

  const [selectedStock, setSelectedStock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = sampleStocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const portfolioValue = samplePortfolio.reduce((total, holding) => total + holding.quantity * holding.price, 0);
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              My Portfolio
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              ${portfolioValue.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Current Portfolio Value
            </Typography>
            <Typography variant="h6" gutterBottom>
              Current Holdings
            </Typography>
            <List>
              {samplePortfolio.map((holding) => (
                <ListItem key={holding.symbol}>
                  <ListItemText
                    primary={`${holding.symbol} - ${holding.quantity} shares @ $${holding.price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary">
              Trade Stock
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Market Data
            </Typography>
            <TextField
              label="Search stocks"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
            />
            <List>
              {filteredStocks.map((stock) => (
                <ListItem
                  key={stock.symbol}
                  button
                  onClick={() => setSelectedStock(stock)}
                >
                  <ListItemText
                    primary={stock.symbol}
                    secondary={
                      <>
                        {stock.name}
                        <br />
                        ${stock.price.toFixed(2)}{' '}
                        <span style={{ color: stock.change >= 0 ? 'green' : 'red' }}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </span>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          {selectedStock && (
            <Paper sx={{ p: 3, mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                {selectedStock.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {selectedStock.symbol}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${selectedStock.price.toFixed(2)}
              </Typography>
              {/* Add more detailed stock info */}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;