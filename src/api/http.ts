export const API_BASE_URL = "https://rickandmortyapi.com/api";

export async function http(url: string) {
  const response = await fetch(url, {
    method: "GET",
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
