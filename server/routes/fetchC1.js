import express from 'express';
import Criteria1Model from '../models/criteria1.js';

const app = express();

app.get('/fetch', async (req, res) => {
  try {
    const { department, academicYear } = req.query;

    if (!department || !academicYear) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const data = await Criteria1Model.findOne({ department, academicYear });

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
export {app as fetchC1};
