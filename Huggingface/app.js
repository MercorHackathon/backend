const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a mapping of emotion labels to their corresponding base y-axis values
const emotionBaseYValues = {
  joy: 90,
  neutral: 80,
  approval: 70,
  relief: 60,
  admiration: 50,
  excitement: 40,
  caring: 30,
  gratitude: 20,
  amusement: 10,
  love: 0, // Happy emotion with the highest value
  optimism: -10,
  realization: -20,
  annoyance: -30,
  disapproval: -40,
  sadness: -50, // Sad emotion with the least value
  pride: -60,
  confusion: -70,
  anger: -80,
  desire: -90,
  disappointment: -100,
  curiosity: -110,
  nervousness: -120,
  surprise: -130,
  remorse: -140,
  grief: -150,
  embarrassment: -160,
  fear: -170,
  disgust: -180
};

// Define a function to calculate the complexity score of a sentence
function calculateComplexityScore(sentence) {
  // Implement your complexity scoring logic here
  // This can be based on sentence length, grammar complexity, presence of certain words, etc.
  // For simplicity, we'll use sentence length as an example
  return sentence.length;
}

app.post('/analyze', (req, res) => {
  const userInput = req.body.userInput;
  console.log('Received userInput:', userInput);

  const requestData = {
    inputs: userInput
  };

  query(requestData)
    .then((response) => {
      console.log('Hugging Face API response:', response);

      const emotions = response[0];
      const emotionResults = [];

      const complexityScore = calculateComplexityScore(userInput);

      for (const emotion of emotions) {
        const label = emotion.label;
        const score = emotion.score.toFixed(4);

        // Calculate the adjusted y-axis value based on the complexity score
        const baseYValue = emotionBaseYValues[label];
        const yValue = baseYValue - complexityScore;

        emotionResults.push({
          emotion: label,
          score: score,
          yValue: yValue,
        });
      }

      console.log('Emotion results:', emotionResults);

      res.json(emotionResults);
    })
    .catch((error) => {
      console.error('An error occurred:', error.message);
      res.status(500).send('An error occurred');
    });
});



async function query(data) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
      data,
      {
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while making the request: ' + error.message);
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
