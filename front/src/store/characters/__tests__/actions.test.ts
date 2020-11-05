import * as actions from '../actions';
import { Types } from '../types';
import { charactersMockData } from '../../../../__mocks__/mocks';

describe('characters actions', () => {
  it('enable loading', () => {
    expect(actions.enableLoading()).toEqual({ type: Types.LOADING });
  });

  it('request success', () => {
    const data = {
      characters: charactersMockData.results,
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results
    }

    const action = actions.requestSuccess(data);

    expect(action).toEqual({
      type: Types.REQUEST_SUCCESS,
      payload: { ...data }
    });
  });

  it('request error', () => {
    const action = actions.requestError({ error: 'error' });

    expect(action).toEqual({
      type: Types.REQUEST_ERROR,
      payload: { error: 'error' }
    });
  });

  it('save edit', () => {
    const data = {
      aliases: 'aliases',
      birth: 'birth',
      gender: 1,
      id: 1253,
      name: 'name',
      realName: 'realName'
    };

    const action = actions.saveEdit(data);

    expect(action).toEqual({
      type: Types.EDIT,
      payload: { ...data }
    });
  });

  it('search success', () => {
    const data = {
      characters: charactersMockData.results,
      totalCharacters: charactersMockData.number_of_page_results,
      totalResults: charactersMockData.number_of_total_results
    }

    const action = actions.searchSuccess(data);

    expect(action).toEqual({
      type: Types.SEARCH_SUCCESS,
      payload: { ...data }
    });
  });
});