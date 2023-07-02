const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/User');

const Phealth= async (req, res) => {
  const { username, accountID, apiKey } = req.query;

  try {
    const response = await fetch(`https://v1.nocodeapi.com/${accountID}/fit/${apiKey}/aggregatesDatasets?dataTypeName=steps_count,heart_minutes,calories_expended&timePeriod=30days`);
    const jsonData = await response.json();

    if (jsonData.error) {
      throw new Error(jsonData.message);
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User does not exist');
    }

    user.Phealth = jsonData;
    await user.save();

    res.status(200).json({ success: true, message: 'Fitness data saved successfully' });
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).json({ success: false, message: 'Error fetching or saving data' });
  }
};

module.exports = Phealth;
