/**
 * Verifies if is a valid Hugging face token.
 *
 * @param {string} token - Hugging face api token.
 */
export const isValidHFToken = (token) => {
  const regex = /^Bearer hf_[A-Za-z0-9-_]{15,}$/;
  return regex.test(token);
};
