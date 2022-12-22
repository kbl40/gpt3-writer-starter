import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
    Without repeating the names of the songs or artists, what personality traits would a person with this top five Spotify songs have?  
    `;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 250, 
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    // Build Prompt #2

    const secondPrompt = 
    `
    Top 5 Spotify song list: ${req.body.userInput}

    ${basePromptOutput.text}

    Imagine this person is a hero that is about to start an epic quest.  They are seeking a mentor and partner to help them on their journey. Without repeating the names of the songs, generate the html for a website describing the hero and their story so far. the website should be told from the first person perspective. Do not include a style element or CSS.  The hero's website should have a mobile-first design style and is similar to a blog site. The website should be minimalistic with a header with nav element but include places for images to be included. include buttons in the footer that link to the hero's twitter and instagram pages. 
    `

    // Call the OpenAI API a second time
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.8,
        max_tokens: 1250,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({ output: secondPromptOutput });
}

export default generateAction;