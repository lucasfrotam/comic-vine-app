import produce from 'immer';
import { Actions, State, Types } from './types';

export const initialState: State = {
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

export default function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case Types.LOADING: {
      return produce(state, (draft: State) => {
        draft.loading = true;
        draft.error = '';
      });
    }

    case Types.LOADING_DISABLE: {
      return produce(state, (draft: State) => {
        draft.loading = false;
        draft.error = '';
      });
    }

    case Types.REQUEST_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.error = '';
        draft.totalCharacters = state.totalCharacters + action.payload.totalCharacters;
        draft.characters = [...state.characters, ...action.payload.characters];
        draft.totalResults = state.totalResults < action.payload.totalResults
          ? action.payload.totalResults
          : state.totalResults;
      });
    }

    case Types.REQUEST_ERROR: {
      return produce(state, (draft: State) => {
        draft.loading = false;
        draft.error = action.payload.error;
      });
    }

    case Types.EDIT: {
      return produce(state, (draft: State) => {
        draft.characters = state.characters?.map((character: Character) => {
          if (character.id === action.payload.id) {
            const updatedCharacter = {
              ...character,
              name: action.payload.name,
              gender: action.payload.gender,
              real_name: action.payload.realName,
              aliases: action.payload.aliases,
              birth: action.payload.birth,
              favorite: action.payload.favorite,
            };
            if (action.payload.favorite) {
              var item = state.favorites.find(item => item.id === action.payload.id);
              if (!item) draft.favorites.push(updatedCharacter);
            }else {
              draft.favorites = state.favorites.filter(item => {
                return item.id !== updatedCharacter.id;
              });
            }
            return updatedCharacter
          }
          return character;
        });

        if (draft.search.characters.length) {
          draft.search.characters = state.search.characters.map((character: Character) => {
            if (character.id === action.payload.id) {
              const updatedCharacter = { ...character, favorite: action.payload.favorite};
              if (action.payload.favorite && !character.favorite){
                draft.favorites.push(updatedCharacter);
              } else {
                draft.favorites = state.favorites.filter(item => item.id !== updatedCharacter.id);
              }
              return updatedCharacter
            }

            return character;
          });
        }
      });
    }

    case Types.TOGGLE_FAVORITE: {
      return produce(state, (draft: State) => {
        var saved = false;
        draft.characters = state.characters?.map((character: Character) => {
          if (character.id === action.payload.id) {
            saved = true;
            const updatedCharacter = { ...character, favorite: !character.favorite };
            if (updatedCharacter.favorite) {
              draft.favorites.push(updatedCharacter);
            }else {
              draft.favorites = state.favorites.filter(item => item.id !== updatedCharacter.id);
            }
            return updatedCharacter;
          }

          return character;
        });

        draft.search.characters = saved ? state.search.characters : state.search.characters?.map((character: Character) => {
          if (character.id === action.payload.id) {
            const updatedCharacter = { ...character, favorite: !character.favorite };
            if (updatedCharacter.favorite) {
              draft.favorites.push(updatedCharacter);
            }else {
              draft.favorites = state.favorites.filter(item => item.id !== updatedCharacter.id);
            }
            return updatedCharacter;
          }

          return character;
        });

      });
    }

    case Types.SEARCH_ENABLE_LOADING: {
      return produce(state, (draft: State) => {
        draft.search.loading = true;
      });
    }

    case Types.SEARCH_DISABLE_LOADING: {
      return produce(state, (draft: State) => {
        draft.search.loading = false;
      });
    }

    case Types.SEARCH_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading = false;
        draft.error = '';
        draft.search.totalCharacters = action.payload.totalCharacters;
        draft.search.totalResults = action.payload.totalResults;
        draft.search.characters = action.payload.characters;
      });
    }

    case Types.CLEAR_SEARCH: {
      return produce(state, (draft: State) => {
        draft.loading = false;
        draft.error = '';
        draft.search.totalCharacters = 0;
        draft.search.totalResults = 0;
        draft.search.characters = [];
      });
    }

    case Types.SHOW_FAVORITE: {
      return produce(state, (draft: State) => {
        draft.showFavorites = true;
      });
    }

    case Types.HIDE_FAVORITE: {
      return produce(state, (draft: State) => {
        draft.showFavorites = false;
      });
    }

    default:
      return state;
  }
}
