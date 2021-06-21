export interface IEpisodeModel {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface ILocationModel {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}
export interface ICharacterModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocationModel;
  location: ILocationModel;
  image: string;
  episode: string[];
  url: string;
}
