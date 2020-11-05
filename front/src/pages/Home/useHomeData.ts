import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as charactersActions from "store/characters/actions";
import * as charactersSelectors from "store/characters/selectors";

interface SaveEditCharacter {
  id: number;
  name: string;
  gender: number;
  realName: string | null;
  aliases: string | null;
  birth: string | null;
  favorite: boolean;
}

interface UseHomeData {
  loading: boolean;
  error?: string;
  characters: Character[];
  totalCharacters: number;
  totalResults: number;
  getMoreCharacters: () => void;
  saveEditCharacter: (data: SaveEditCharacter) => void;
  onSearchClick: (name: string) => void;
  search: {
    characters: Character[];
    totalCharacters: number;
    totalResults: number;
    loading: boolean;
  };
  favorites: Character[];
  favoriteMode: boolean;
  toggleFavorite: (id: number) => void;
  showFavorites: () => void,
  hideFavorites: () => void
}

export default function useHomeData(): UseHomeData {
  const dispatch = useDispatch();

  const { characters, totalCharacters, totalResults } = useSelector(
    charactersSelectors.getCharactersAndTotals
  );

  const search = useSelector(charactersSelectors.getSearch);
  const loading = useSelector(charactersSelectors.isLoading);
  const error = useSelector(charactersSelectors.hasError);
  const favorites = useSelector(charactersSelectors.getFavorites);
  const favoriteMode = useSelector(charactersSelectors.getFavoritesVisibility);

  const getCharacters = useCallback(() => {
    dispatch(charactersActions.getCharacters());
  }, [dispatch]);

  const saveEditCharacter = useCallback(
    (data: SaveEditCharacter) => {
      dispatch(charactersActions.saveEdit(data));
    },
    [dispatch]
  );

  const onSearchClick = useCallback(
    (name: string) => {
      dispatch(charactersActions.search({ name }));
    },
    [dispatch]
  );

  const toggleFavorite = useCallback((id: number) => {
    dispatch(charactersActions.toggleFavorite({ id }));
  }, [dispatch]);

  const showFavorites = useCallback(() => {
    dispatch(charactersActions.showFavorites());
  }, [dispatch]);

  const hideFavorites = useCallback(() => {
    dispatch(charactersActions.hideFavorites());
  }, [dispatch]);

  return {
    loading,
    error,
    characters,
    totalCharacters,
    totalResults,
    getMoreCharacters: getCharacters,
    saveEditCharacter,
    onSearchClick,
    search,
    favorites,
    toggleFavorite,
    favoriteMode,
    showFavorites,
    hideFavorites
  };
}
