export const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * @summary Sends HTTP requests using Fetch API
 * @param {string} url
 * @param {object} options
 * @return {Object}
 */
export async function http(url: string, options: object) {
  const response = await fetch(url, {
    ...options,
    mode: "cors",
  });
  const responseData = await response.json();

  if (response.ok) {
    return Promise.resolve(responseData);
  }

  const error = {
    status: response.status,
    message: responseData.message,
  };

  return Promise.reject(error);
}

/**
 * @summary Sends a GET HTTP request
 * @param {string} url
 * @return {Function} 
 */
export async function getData(url: string) {
  return http(url, {
    method: "GET",
  });
}
