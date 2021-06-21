import React, { useEffect, useState } from "react";

import Character from "./components/character/index";
import CharacterModal from "./components/character/modal";
import Pagination from "./components/pagination";
import { getCharacters } from "./api/character";
import { ICharacterModel, IPageMetaModel } from "./api/types";

const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();
  const [characters, setCharacters] = useState<ICharacterModel[]>([]);
  const [pageMeta, setPageMeta] = useState<IPageMetaModel>();
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterModel>();

  const showCharacterModal = (character: ICharacterModel) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeCharacterModal = () => {
    setSelectedCharacter(undefined);
    setShowModal(false);
  };

  const handleNextButtonClick = async () => {    
    if (pageMeta?.next) {
      const [nextPageNumber] = pageMeta.next.split('page=').slice(-1);

      setIsLoading(true);
      try {
        const { rmCharacters, meta } = await getCharacters(nextPageNumber);
        setCharacters(rmCharacters);
        setPageMeta(meta);
      } catch (error) {
        const errorMessage = error?.message || DEFAULT_ERROR_MESSAGE;
        setError(errorMessage)
      }
      setIsLoading(false);
    }
  };

  const handlePrevButtonClick = async () => {
    if (pageMeta?.prev) {
      const [prevPageNumber] = pageMeta.prev.split('page=').slice(-1);

      setIsLoading(true);
      try {
        const { rmCharacters, meta } = await getCharacters(prevPageNumber);
        setCharacters(rmCharacters);
        setPageMeta(meta);
      } catch (error) {
        const errorMessage = error?.message || DEFAULT_ERROR_MESSAGE;
        setError(errorMessage)
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const { rmCharacters, meta } = await getCharacters();
        setCharacters(rmCharacters);
        setPageMeta(meta);
      } catch (error) {
        const errorMessage = error?.message || DEFAULT_ERROR_MESSAGE;
        setError(errorMessage)
      }
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  return (
    <div className="app">
      <main className="app-main">
        <header className="py-4">
          <h1 className="text--center text--coral">Rick and Morty</h1>
        </header>

        {error && (<span className="app-error">{error}</span>)}

        {isLoading ? (
          <div className="flex flex-row align-center">
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap">
            {characters.map((character) => {
              return (
                <Character
                  key={character.id}
                  {...character}
                  onClick={() => showCharacterModal(character)}
                />
              );
            })}
          </div>
        )}
        {pageMeta && (
          <footer className="app-footer">
            <Pagination
              {...pageMeta}
              handleNextButtonClick={handleNextButtonClick}
              handlePrevButtonClick={handlePrevButtonClick}
            />
          </footer>
        )}
      </main>
      {showModal ? (
        <CharacterModal character={selectedCharacter} handleClose={closeCharacterModal} />
      ) : null}
    </div>
  );
}

export default App;
