import React, { useRef } from "react";
import { Header } from "components/header/header";
import { Search } from "components/search/search";
import { List } from "components/list/list";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { Footer } from "components/footer/footer";
import { Body } from "components/body/body";
import logo from "assets/logo.png";
import { Loading } from "components/loading/loading";
import { Switch } from "components/switch/switch";
import useHomeData from "./useHomeData";
import useInfiniteScroll from 'hooks/useInfiniteScroll';

export const Home = () => {
  const history = useHistory();

  const {
    loading,
    characters,
    getMoreCharacters,
    onSearchClick,
    search,
    favorites,
    toggleFavorite,
    showFavorites,
    hideFavorites,
    favoriteMode
  } = useHomeData();

  const bodyRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    elementRef: bodyRef,
    getMore: getMoreCharacters
  });

  const goToDetailsPage = (character) => {
    history.push(`/details/${character.id}`, { character });
  };

  return (
    <div className="container">
      <Header>
        <img className="logo" src={logo} alt="logo" />
        <Search onSearchClick={(e) => {
          onSearchClick(e);
          hideFavorites();
        }} />
        <span className="total-items">Records: {favoriteMode ? favorites.length :
          !search.characters.length ? characters.length : search.characters.length}</span>
      </Header>

      <Body reference={bodyRef}>
        <div className="body-home">
          <Switch
            isOn={favoriteMode}
            onColor="#FFD0D0"
            handleToggle={() => favoriteMode ? hideFavorites() : showFavorites()}

            tooltip="Favorites"
          />

          <List
            visible={!search.characters.length && !favoriteMode && !search.loading}
            characters={characters}
            onClick={(e) => goToDetailsPage(e)}
            toggleFavorite={toggleFavorite}
          />

          <List
            visible={!!search.characters.length && !favoriteMode}
            characters={search.characters}
            onClick={(e) => goToDetailsPage(e)}
            toggleFavorite={toggleFavorite}
          />

          <List
            visible={favoriteMode}
            characters={favorites}
            onClick={(e) => goToDetailsPage(e)}
            toggleFavorite={toggleFavorite}
          />

          {loading || search.loading ? <Loading /> : null}
        </div>
      </Body>

      <Footer />
    </div >
  );
};

