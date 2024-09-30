const Stock = require('../models/Stock');

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error('Error in getAllStocks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.addStock = async (req, res) => {
  console.log('Received request body:', req.body);
  
  if (!req.body.symbol || !req.body.name || !req.body.price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const stock = new Stock({
    symbol: req.body.symbol,
    name: req.body.name,
    price: req.body.price
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    console.error('Error in addStock:', error);
    res.status(400).json({ message: error.message });
  }
};