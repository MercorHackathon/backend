const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
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

rl.question('Enter your sentence: ', (userInput) => {
  rl.close();

  const requestData = {
    inputs: userInput
  };

  console.log('Sending request...');
  query(requestData)
    .then((response) => {
      console.log('Response:', response);
      const emotions = response[0].scores;
      console.log('Emotions:');
      for (const emotion in emotions) {
        console.log(`${emotion}: ${emotions[emotion].toFixed(4)}`);
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error.message);
    });
});
