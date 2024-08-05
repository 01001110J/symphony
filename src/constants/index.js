/*
 * I know, I know, this should not be here, but I had challenged to my self to make something awesome without spend a single penny, I know,
 * I've dishonor my cow, did I already say I sorry? I know, shame shame shame, this must go in to a cloud function, shame, shame, shame.
 */
export const WRITE_PERMISSION = 'write';

export const COLLECTIONS = {
  users: 'users',
  songs: 'songs',
  playList: 'play-list',
};

export const HUGGING_FACE_LOCAL_STORAGE_TOKEN = 'symphony-hugging-api-token';
export const PERPLEXITY_LOCAL_STORAGE_TOKEN = 'symphony-perplexity-api-token';

export const TITLE_SONG_PROMPT =
  'Genera el titulo y asigna un genero máximo 3 palabras para una canción, divide el titulo y el genero con un - usa como referencia la siguiente description: ';

export const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/musicgen-small';
export const PERPLEXITY_API_URL = 'https://api.perplexity.ai/';
