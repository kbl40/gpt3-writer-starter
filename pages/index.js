import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import hero from '../assets/hero.jpeg';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`)
    setIsGenerating(false)
  }

  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
  }

  const nextPageClick = () => {
    console.log('Next page coming soon!')
  }

  return (
    <div className="root">
      <Head>
        <title>Collab Quest</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Collaborate, don't compete</h1>
          </div>
          <div className="header-subtitle">
            <h2>Work through quests to learn skills that will help you ship faster and build better.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <Image className="hero-img" src={hero} alt="hero seen from behind looking at mountains"/>
          <div className="prompt-container-text">
            <h2>:Part 0:</h2>
            <p>Since you are the ⚔️ <span className='bold'>Hero</span> 🛡️ on this journey, let's start by building a website about you!</p>
            <p>List your top 5 Spotify song titles in the box below ⬇️</p>
          </div>
          <textarea 
            placeholder="e.g. 1. Wow Freestyle (feat. Kendrick Lamar), 2..." 
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText} 
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className='loader'></span>: <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <pre><code>{apiOutput}</code></pre>
              </div>
              <div className='output-explanation'>
                <h2>How did that work and what is going on here?</h2>
                <p>All you did, Hero, was record your top five songs. How did HTML for your own personal website documenting the beginning of this journey get here?</p>
                <p>Welcome to skill #1 - using GPT-3 to generate custom code and content with a single prompt!</p>
                <p>What is GPT-3, you might ask? Let's ask GPT-3!</p>
                <div className='output-content'>
                  <pre><code>GPT-3 is an advanced natural language processing (NLP) system that is capable of generating text using machine learning algorithms. It can process natural language inputs and generate meaningful outputs. In the case of generating HTML code, GPT-3 is able to understand the structure of HTML code and the context of the input. It then uses existing HTML code to generate the code for the specific output. By understanding the structure and context of the input, GPT-3 is able to generate HTML code that is eerily close to what could have been written by a human coder.</code></pre>
                </div>
                <p>Along this journey you're going to learn to work collaboratively with new AI tools. Think of them as assistants that will make you a more capable developer!</p>
                <p>Let's dig in!</p>
              </div>
              <div className="prompt-buttons">
                <a
                  className={'generate-button'} 
                  onClick={nextPageClick}>
                  <div className="generate">
                    <p>Onward!</p>
                  </div>
                </a>
          </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
