import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import {
  TITLE_SONG_PROMPT,
  LYRICS_SONG_PROMPT,
  PERPLEXITY_API_URL,
  HUGGING_FACE_API_URL,
  PERPLEXITY_LOCAL_STORAGE_TOKEN,
  HUGGING_FACE_LOCAL_STORAGE_TOKEN,
} from '@constants';

export const isValidHFToken = (token) => {
  const regex = /^Bearer hf_[A-Za-z0-9-_]{15,}$/;
  return regex.test(token);
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const processLyrics = (text) => {
  let cleanText = text.replace(/\*/g, '');
  let linesArray = cleanText.split('\n').filter((text) => text !== '');

  return linesArray;
};

export const cleanAndSplitString = (input) => {
  const cleanedInput = input.replace(/\*\*/g, '').trim();
  const [title, category] = cleanedInput.split(' - ').map((str) => str.trim());

  return [title, category];
};

export const getSongTitle = async (songPrompt) => {
  try {
    const token = localStorage.getItem(PERPLEXITY_LOCAL_STORAGE_TOKEN);

    const perplexity = createOpenAI({
      apiKey: token,
      baseURL: PERPLEXITY_API_URL,
    });

    const { text } = await generateText({
      model: perplexity('llama-3-sonar-large-32k-online'),
      prompt: TITLE_SONG_PROMPT + songPrompt,
    });

    const titleAndCategory = cleanAndSplitString(text);

    return titleAndCategory;
  } catch (error) {
    return console.log(error);
  }
};

export const getSongLyrics = async (lyricsPrompt) => {
  try {
    const token = localStorage.getItem(PERPLEXITY_LOCAL_STORAGE_TOKEN);

    const perplexity = createOpenAI({
      apiKey: token,
      baseURL: PERPLEXITY_API_URL,
    });

    const { text } = await generateText({
      model: perplexity('llama-3-sonar-large-32k-online'),
      prompt: LYRICS_SONG_PROMPT + lyricsPrompt,
    });

    return processLyrics(text);
  } catch (error) {
    return console.log(error);
  }
};

export const getSongFromHg = async (prompt) => {
  try {
    const hgToken = localStorage.getItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN);

    const input = { inputs: prompt };
    const response = await fetch(HUGGING_FACE_API_URL, {
      headers: {
        Authorization: hgToken,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    return url;
  } catch (error) {
    console.log(error);
  }
};
