import { saveEpisode, saveLocation, getEpisode, getLocation } from "../lib/storage";
import { http, API_BASE_URL } from "./http";
import { ICharacterModel } from "./types";

async function getRMEpisode(episodeUrl: string) {
  const [episodeId] = episodeUrl.split("/").slice(-1);
  let episode = getEpisode(episodeId);

  if (!episode) {
    episode = await http(episodeUrl);
    saveEpisode(episode);
  }

  const { name } = episode;
  return name;
}

async function buildRMCharacter(character: ICharacterModel) {
  const rmCharacter = { ...character };
  const episodeUrls = character.episode.map((episodeUrl) => {
    return getRMEpisode(episodeUrl);
  });
  const [locationId] = character.location.url.split("/").slice(-1);
  const [originId] = character.origin.url.split("/").slice(-1);

  let characterLocation = getLocation(locationId);
  let characterOrigin = locationId === originId ? characterLocation : getLocation(originId);

  if (character.location.url) {
    if (!characterLocation) {
      characterLocation = await http(character.location.url);
      saveLocation(characterLocation);
    }
  }

  if (character.origin.url) {
    if (!characterOrigin) {
      characterOrigin = await http(character.origin.url);
      saveLocation(characterOrigin);
    }
  }

  rmCharacter.episode = await Promise.all(episodeUrls);
  rmCharacter.location = characterLocation;
  rmCharacter.origin = characterOrigin;

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

    return {
      rmCharacters,
      info,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
