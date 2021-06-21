export const API_BASE_URL = "https://rickandmortyapi.com/api";

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

export async function getData(url: string) {
  return http(url, {
    method: "GET",
  });
}
