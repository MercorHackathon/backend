const { default: axios } = require("axios")

async function huggingFaceAPI(sentence) {
    const calculateComplexityScore = () => {
        // Implement your complexity scoring logic here
        // This can be based on sentence length, grammar complexity, presence of certain words, etc.
        // For simplicity, we'll use sentence length as an example
        return sentence.length;
    }

    const emotionBaseYValues = {
        joy: 140,
        approval: 130,
        relief: 120,
        admiration: 110,
        excitement: 100,
        caring: 90,
        gratitude: 80,
        amusement: 70,
        love: 60,
        optimism: 50,
        realization: 40,
        surprise: 30,
        curiosity: 20,
        neutral: 0,
        pride: -10,
        confusion: -20,
        desire: -30,
        disapproval: 40,
        anger: -50,
        annoyance: -60,
        disappointment: -70,
        nervousness: -80,
        embarrassment: -90,
        fear: -100,
        disgust: -110,
        sadness: -120, 
        remorse: -130,
        grief: -140,
    };

    const huggingfaceURI = 'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions'
    const request_data = {
        inputs: sentence
    }
    try {
        const data = (await axios.post(huggingfaceURI, request_data, 
            {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })).data[0]
        const complexityScore = calculateComplexityScore(sentence);
        const emotionResults = [];

        for (const emotion of data) {
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

        // Return the emotion object with the highest score
        return emotionResults.reduce((prev, curr) => {
            return (curr.score > prev.score) ? curr : prev;
        })
    }
    catch(err) {
        console.error(err);
        return {};
    }
}

module.exports = huggingFaceAPI;