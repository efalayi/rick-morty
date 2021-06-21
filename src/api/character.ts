import { http, API_BASE_URL } from "./http";
import { ICharacterModel } from "./types";

async function getEpisode(episodeUrl: string) {
  const { name } = await http(episodeUrl);

  return name;
}

// todo: optimise so requests do not have to be fetched mulltiple times
async function buildRMCharacter(character: ICharacterModel) {
  const rmCharacter = { ...character };
  const episodeUrls = character.episode.map((episodeUrl) => {
    return getEpisode(episodeUrl);
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
