import reducer from '../reducers';
import * as actions from '../actions';
import { State } from '../types';
import { charactersMockData } from '../../../../__mocks__/mocks';

const initialState: State = {
  loading: false,
  error: '',
  characters: [],
  totalCharacters: 0,
  totalResults: 0,
  search: {
    loading: false,
    characters: [],
    totalCharacters: 0,
    totalResults: 0,
  },
  favorites: [],
  showFavorites: false
};

describe('characters reducers', () => {
  it('should be enable loading and clear error', () => {
    // @ts-ignore
    expect(reducer(initialState, actions.enableLoading())).toEqual({
      ...initialState,
      loading: true,
      error: '',
    });
  });

  it('should be fill the total characters, total of the results and characters', () => {
    const action = actions.requestSuccess({
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    });

    // @ts-ignore
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    });
  });


  it('true value must be assigned without error status when a request fails', () => {
    const action = actions.requestError({ error: 'error' });

    const currentState = {
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    }

    // @ts-ignore
    expect(reducer(currentState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'error',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    });
  });

  it('when searching the search field must be filled', () => {
    const action = actions.searchSuccess({
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    });

    const currentState = {
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    }

    // @ts-ignore
    expect(reducer(currentState, action)).toEqual({
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
      search: {
        loading: false,
        totalCharacters: charactersMockData.number_of_page_results,
        totalResults: charactersMockData.number_of_total_results,
        characters: charactersMockData.results,
      }
    });
  });

  it('a character must be edited and the other items must not be edited', () => {
    const action = actions.saveEdit({
      aliases: 'aliases',
      birth: 'birth',
      gender: 1,
      id: 1253,
      name: 'name',
      realName: 'realName',
      favorite: false,
    });

    const currentState = {
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: charactersMockData.results,
    }

    // @ts-ignore
    expect(reducer(currentState, action)).toEqual({
      ...initialState,
      loading: false,
      error: '',
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results,
      characters: [
        {
          ...charactersMockData.results[0],
          aliases: 'aliases',
          birth: 'birth',
          gender: 1,
          id: 1253,
          name: 'name',
          real_name: 'realName',
          favorite: false,
        },
        charactersMockData.results[1],
      ],
    });
  });
});