import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
    Write four very short headings for a company's blog post describing its product.
    
    The company  
    `;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.8,
        max_tokens: 250, // Set this to 750 later
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    // Build Prompt #2

    const secondPrompt = 
    `
    Take the Headings and Company Description and generate the html for a website. Do not include a style element or CSS.  The company's website should have a mobile-first design style and is similar in style to Tesla's website. The website should be minimalistic but include places for images to be included. It needs to have a header with a nav element, two sections, and a footer. Each section should contain two subheadings. Each subheading should have two paragraph elements in each of them.

    Headings: ${basePromptOutput.text}

    Company Description: ${req.body.userInput}

    `

    // Call the OpenAI API a second time
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.75,
        max_tokens: 1500,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({ output: secondPromptOutput });
}

export default generateAction;