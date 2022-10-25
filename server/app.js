import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// ENV Variables
const PORT = process.env.PORT || 8080;
const SQL_DB_URI = process.env.SQL_DB_URI || 'sqlite://./server/db/deals.db';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const sequelize = new Sequelize(SQL_DB_URI);
const Deal = sequelize.define('Deal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  relationshipManager: DataTypes.STRING,
  dealAmount: DataTypes.FLOAT,
});
sequelize.sync();

try {
  await sequelize.authenticate();
  console.log('Successful DB connection...');
} catch (err) {
  console.error('Unable to connect to db:', err);
}

app.get('/api/deals', async (req, res, next) => {
  try {
    const deals = await Deal.findAll();
    return res.status(200).json({ success: true, deals: deals });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/create/deal', async (req, res, next) => {
  const { name, relationshipManager, dealAmount } = req.body;
  if (!name || !relationshipManager || !dealAmount) {
    return res.status(400).json({
      success: false,
      error:
        'Please include "name", "relationshipManager", and "dealAmount" in request body.',
    });
  }
  const newDeal = await Deal.create({
    name: name,
    relationshipManager: relationshipManager,
    dealAmount: dealAmount,
  });

  return res.status(200).json({ success: true, dealDetails: newDeal });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
