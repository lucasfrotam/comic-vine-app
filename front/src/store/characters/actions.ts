import { Payload, Types } from './types';

export const getCharacters = () => ({ type: Types.REQUEST });
export const enableLoading = () => ({ type: Types.LOADING });
export const disableLoading = () => ({ type: Types.LOADING_DISABLE });

export const enableSearchLoading = () => ({ type: Types.SEARCH_ENABLE_LOADING });
export const disableSearchLoading = () => ({ type: Types.SEARCH_DISABLE_LOADING });

export const requestSuccess = (data: Payload[Types.REQUEST_SUCCESS]) => ({
  type: Types.REQUEST_SUCCESS,
  payload: { ...data },
});

export const requestError = ({ error }: Payload[Types.REQUEST_ERROR]) => ({
  type: Types.REQUEST_ERROR,
  payload: { error },
});

export const saveEdit = (data: Payload[Types.EDIT]) => ({
  type: Types.EDIT,
  payload: { ...data },
});

export const toggleFavorite = ({ id }: Payload[Types.TOGGLE_FAVORITE]) => ({
  type: Types.TOGGLE_FAVORITE,
  payload: { id }
})

export const search = ({ name }: Payload[Types.SEARCH]) => ({
  type: Types.SEARCH,
  payload: { name },
});

export const clearSearch = () => ({ type: Types.CLEAR_SEARCH });

export const searchSuccess = (data: Payload[Types.SEARCH_SUCCESS]) => ({
  type: Types.SEARCH_SUCCESS,
  payload: { ...data },
});

export const showFavorites = () => ({ type: Types.SHOW_FAVORITE });

export const hideFavorites = () => ({ type: Types.HIDE_FAVORITE });