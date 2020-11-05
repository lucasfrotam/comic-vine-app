import * as selectors from '../selectors';
import { State } from '../types';
import { charactersMockData } from '../../../../__mocks__/mocks';

const state: State = {
  loading: false,
  error: 'error',
  characters: charactersMockData.results,
  totalCharacters: charactersMockData.number_of_page_results,
  totalResults: charactersMockData.number_of_total_results,
  search: {
    loading: false,
    characters: [],
    totalCharacters: 0,
    totalResults: 0,
  },
  favorites: [],
  showFavorites: false
};

describe('characters selectors', () => {
  it('characters slice', () => {
    expect(selectors.charactersSlice({ characters: state })).toBe(state);
  });

  it('is loading', () => {
    expect(selectors.isLoading({ characters: state })).toBe(false);
  });

  it('has error', () => {
    expect(selectors.hasError({ characters: state })).toBe('error');
  });

  it('get characters and totals', () => {
    expect(selectors.getCharactersAndTotals({ characters: state })).toEqual({
      characters: charactersMockData.results,
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
    })
  });

  it('get search', () => {
    expect(selectors.getSearch({ characters: state })).toEqual({
      loading: false,
      characters: [],
      totalCharacters: 0,
      totalResults: 0,
    })
  });
});