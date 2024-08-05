import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isValidHFToken } from '@helpers';

import { HUGGING_FACE_LOCAL_STORAGE_TOKEN, PERPLEXITY_LOCAL_STORAGE_TOKEN } from '@constants';

export const TokenContext = createContext();

const huggingFaceInputInitialState = {
  value: '',
  error: false,
  message: '',
};

const TokensProvider = ({ children }) => {
  const [hasHuggingToken, setHasHuggingToken] = useState(false);
  const [huggingInput, setHuggingInput] = useState(huggingFaceInputInitialState);

  const [hasPerplexityToken, setHasPerplexityToken] = useState(false);
  const [perplexityInput, setPerplexityInput] = useState(huggingFaceInputInitialState);

  const saveHuggingFaceToken = () => {
    const token = 'Bearer ' + huggingInput.value;
    const isTokenValid = isValidHFToken(token);

    if (!isTokenValid) {
      return setHuggingInput({
        ...huggingInput,
        error: true,
        message: 'El token proporcionado no es valido, por favor verifícalo he intenta nuevamente.',
      });
    }

    localStorage.setItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN, token);
    setHasHuggingToken(true);
  };

  const deleteHuggingFaceToken = () => {
    localStorage.removeItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN);
    setHasHuggingToken(false);
    setHuggingInput(huggingFaceInputInitialState);
  };

  const savePerplexityToken = () => {
    const token = perplexityInput.value;
    const isTokenValid = token.length > 10;

    if (!isTokenValid) {
      return setPerplexityInput({
        ...huggingInput,
        error: true,
        message: 'El token proporcionado no es valido, por favor verifícalo he intenta nuevamente.',
      });
    }

    localStorage.setItem(PERPLEXITY_LOCAL_STORAGE_TOKEN, token);
    setHasPerplexityToken(true);
  };

  const deletePerplexityFaceToken = () => {
    localStorage.removeItem(PERPLEXITY_LOCAL_STORAGE_TOKEN);
    setHasPerplexityToken(false);
    setPerplexityInput(huggingFaceInputInitialState);
  };

  useEffect(() => {
    const hasHuggingFaceToken = localStorage.getItem(HUGGING_FACE_LOCAL_STORAGE_TOKEN);
    const hasPerplexityToken = localStorage.getItem(PERPLEXITY_LOCAL_STORAGE_TOKEN);

    if (hasHuggingFaceToken) {
      setHasHuggingToken(true);
      setHuggingInput({
        value: hasHuggingFaceToken,
        error: false,
        message: '',
      });
    }

    if (hasPerplexityToken) {
      setHasPerplexityToken(true);
      setPerplexityInput({
        value: hasPerplexityToken,
        error: false,
        message: '',
      });
    }
  }, []);

  return (
    <TokenContext.Provider
      value={{
        hasHuggingToken,
        huggingInput,
        perplexityInput,
        hasPerplexityToken,
        setHuggingInput,
        setPerplexityInput,
        saveHuggingFaceToken,
        deleteHuggingFaceToken,
        savePerplexityToken,
        deletePerplexityFaceToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

TokensProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokensProvider;
