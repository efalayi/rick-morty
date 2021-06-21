import { ILocationModel, IEpisodeModel } from "../api/types";

export const APP_NAME = "RICK_MORTY";

function getAppStorage() {
  const appStore = sessionStorage.getItem(APP_NAME);
  const currentState = appStore ? JSON.parse(appStore) : {};

  return currentState;
}

export function initialiseAppStorage() {
  const appStore = sessionStorage.getItem(APP_NAME);

  if (!appStore) {
    const state = { episodes: [], locations: [] };
    sessionStorage.setItem(APP_NAME, JSON.stringify(state));
  }
}

export function saveLocation(newLocation: ILocationModel) {
  const currentState = getAppStorage();
  const currentLocations = currentState.locations;

  const locationIndex = currentLocations.findIndex(
    (location: ILocationModel) => location.id === newLocation.id
  );

  if (locationIndex < 0) {
    const updatedLocations = [...currentLocations, newLocation];
    const state = {
      ...currentState,
      locations: updatedLocations,
    };

    sessionStorage.setItem(APP_NAME, JSON.stringify(state));
  }
}

export function saveEpisode(newEpisode: IEpisodeModel) {
  const currentState = getAppStorage();
  const currentEpisodes = currentState.episodes;

  const locationIndex = currentEpisodes.findIndex(
    (episode: IEpisodeModel) => episode.id === newEpisode.id
  );

  if (locationIndex < 0) {
    const updatedEpisodes = [...currentEpisodes, newEpisode];
    const state = {
      ...currentState,
      episodes: updatedEpisodes,
    };

    sessionStorage.setItem(APP_NAME, JSON.stringify(state));
  }
}

export function getLocation(id: string) {
  const locationId = Number.parseInt(id, 10);
  const currentState = getAppStorage();
  const currentLocations = currentState.locations;

  const [location] = currentLocations.filter(
    (location: ILocationModel) => location.id === locationId
  );

  return location;
}

export function getEpisode(id: string) {
  const episodeId = Number.parseInt(id, 10);
  const currentState = getAppStorage();
  const currentEpisodes = currentState.episodes;

  const [episode] = currentEpisodes.filter((episode: ILocationModel) => episode.id === episodeId);

  return episode;
}
