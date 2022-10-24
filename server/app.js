import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// ENV Variables
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const sequelize = new Sequelize('sqlite://./server/db/deals.db');
const Deal = sequelize.define('Deal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  relationshipManager: DataTypes.STRING,
  dealAmount: DataTypes.FLOAT,
  dealDate: DataTypes.DATE,
});
sequelize.sync();

try {
  await sequelize.authenticate();
  console.log('Successful DB connection...');
} catch (err) {
  console.error('Unable to connect to db:', err);
}

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
    dealDate: new Date(),
  });

  return res.status(200).json({ success: true, dealDetails: newDeal });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
