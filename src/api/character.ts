import { saveEpisode, saveLocation, getEpisode, getLocation } from "../lib/storage";
import { getData, API_BASE_URL } from "./http";
import { ICharacterModel } from "./types";

async function getRMEpisode(episodeUrl: string) {
  const [episodeId] = episodeUrl.split("/").slice(-1);
  let episode = getEpisode(episodeId);

  if (!episode) {
    episode = await getData(episodeUrl);
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

  let characterLocation = !character.location.url ? character.location : getLocation(locationId);
  let characterOrigin = !character.origin.url
    ? character.origin
    : locationId === originId
    ? characterLocation
    : getLocation(originId);

  if (!characterLocation) {
    characterLocation = await getData(character.location.url);
    saveLocation(characterLocation);
  }

  if (!characterOrigin) {
    characterOrigin = await getData(character.origin.url);
    saveLocation(characterOrigin);
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

export async function getCharacters(page: string = "1") {
  const pageNumber = Number.parseInt(page);

  try {
    const { info, results } = await getData(`${API_BASE_URL}/character?page=${pageNumber}`);
    const rmCharacters = await buildRMCharacters(results);

    return {
      rmCharacters,
      meta: info,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
