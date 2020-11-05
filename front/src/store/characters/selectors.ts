import { createSelector } from 'reselect';

import { State } from './types';

export const charactersSlice = (state): State => state.characters;

export const isLoading = createSelector(charactersSlice, (state: State) => state.loading);

export const hasError = createSelector(charactersSlice, (state: State) => state.error);

export const getTotals = createSelector(charactersSlice, (state: State) => ({
  totalCharacters: state.totalCharacters,
  totalResults: state.totalResults,
}));

export const getCharactersAndTotals = createSelector(charactersSlice, (state: State) => ({
  characters: state.characters,
  totalCharacters: state.totalCharacters,
  totalResults: state.totalResults,
}));

export const getSearch = createSelector(charactersSlice, (state: State) => state.search);

export const getFavorites = createSelector(charactersSlice, (state: State) => (
  state.favorites
));

export const getFavoritesVisibility = createSelector(charactersSlice, (state: State) => (
  state.showFavorites
));