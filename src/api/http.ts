import { ICharacterModel } from "./types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

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

async function getEpisode(episodeUrl: string) {
  const { name } = await http(episodeUrl);

  return name;
}

// todo: optimise so requests do not have to be fetched mulltiple times
async function buildRMCharacter(character: ICharacterModel) {
  const rmCharacter = {...character}
  const episodeUrls = character.episode.map((episodeUrl) => {
    return getEpisode(episodeUrl)
  });

  rmCharacter.episode = await Promise.all(episodeUrls);

  if (character.location.url) {
    rmCharacter.location = await http(character.location.url);
  }

  if (character.origin.url) {
    rmCharacter.origin = await http(character.origin.url);
  }

  return rmCharacter;
}

async function buildRMCharacters(apiResult: ICharacterModel[]) {
  const characters = apiResult.map((character) => {
    return buildRMCharacter(character);
  });

  try {
    const rmCharacters = await Promise.all(characters);
    return rmCharacters;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Image
// Character information (name, species, etc).
// Origin and location information (name, dimension, amount of residents, etc). Name of the chapters the character is featured on.

export async function getCharacters() {
  try {
    const { info, results } = await http(`${API_BASE_URL}/character`);
    const rmCharacters = await buildRMCharacters(results);

    console.log("rmCharacters: ", rmCharacters);

    return {
      rmCharacters,
      info,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
