export type State = {
  characters: Character[];
  totalCharacters: number;
  totalResults: number;
  loading: boolean;
  error?: string;
  search: {
    loading: boolean;
    characters: Character[];
    totalCharacters: number;
    totalResults: number;
  },
  favorites: Character[],
  showFavorites: boolean,
};

export enum Types {
  REQUEST = 'characters/REQUEST',
  LOADING = 'characters/LOADING',
  LOADING_DISABLE = 'characters/LOADING_DISABLE',
  REQUEST_SUCCESS = 'characters/REQUEST_SUCCESS',
  REQUEST_ERROR = 'characters/REQUEST_ERROR',
  DETAIL = 'characters/DETAIL',
  EDIT = 'characters/EDIT',
  SEARCH = 'characters/SEARCH',
  SEARCH_ENABLE_LOADING = 'characters/SEARCH_ENABLE_LOADING',
  SEARCH_DISABLE_LOADING = 'characters/SEARCH_DISABLE_LOADING',
  SEARCH_SUCCESS = 'characters/SEARCH_SUCCESS',
  CLEAR_SEARCH = 'characters/ClEAR_SEARCH',
  TOGGLE_FAVORITE = 'characters/TOGGLE_FAVORITE',
  SHOW_FAVORITE = 'characters/SHOW_FAVORITE',
  HIDE_FAVORITE = 'characters/HIDE_FAVORITE',
}

export type Payload = {
  [Types.LOADING]: {};
  [Types.LOADING_DISABLE]: {};

  [Types.REQUEST]: {
    limit?: number;
    skip?: number;
  };

  [Types.REQUEST_SUCCESS]: {
    characters: Character[];
    totalCharacters: number;
    totalResults: number;
  };

  [Types.REQUEST_ERROR]: {
    error: string;
  };

  [Types.EDIT]: {
    id: number;
    name: string;
    gender: number;
    realName: string | null;
    aliases: string | null;
    birth: string | null;
    favorite: boolean;
  };

  [Types.SEARCH]: {
    name: string;
  };

  [Types.SEARCH_ENABLE_LOADING]: {};
  [Types.SEARCH_DISABLE_LOADING]: {};

  [Types.CLEAR_SEARCH]: {};

  [Types.SEARCH_SUCCESS]: {
    characters: Character[];
    totalCharacters: number;
    totalResults: number;
  };

  [Types.TOGGLE_FAVORITE]: {
    id: number;
  };
  [Types.SHOW_FAVORITE]: {};
  [Types.HIDE_FAVORITE]: {};
};

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export interface Search {
  type: typeof Types.SEARCH;
  payload: {
    name: string;
  }
}