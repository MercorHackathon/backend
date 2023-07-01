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

app.post('/analyze', (req, res) => {
  const userInput = req.body.userInput;
  console.log('Received userInput:', userInput);

  const requestData = {
    inputs: userInput
  };

  query(requestData)
  .then((response) => {
    console.log('Hugging Face API response:', response);

    const emotions = response[0]; // Access the inner array
    const emotionResults = [];
    for (const emotion of emotions) { // Use "of" instead of "in" to iterate over array elements
      emotionResults.push({
        emotion: emotion.label,
        score: emotion.score.toFixed(4)
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
