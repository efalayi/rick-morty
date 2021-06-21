import React, { useEffect, useState } from "react";

import Character from "./components/character/index";
import CharacterModal from "./components/character/modal";
import { getCharacters } from "./api/character";
import { ICharacterModel } from "./api/types";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [characters, setCharacters] = useState<ICharacterModel[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterModel>();

  const showCharacterModal = (character: ICharacterModel) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeCharacterModal = () => {
    setSelectedCharacter(undefined);
    setShowModal(false);
  };

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const { rmCharacters } = await getCharacters();
        setCharacters(rmCharacters);
      } catch (error) {
        console.log("api error: ", error);
      }
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  return (
    <div className="app">
      <main className="app-main">
        <header className="py-2">
          <h1 className="text--center text--coral">Rick and Morty Characters</h1>
        </header>

        {isLoading ? (
          <span>Loading...</span>
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
      </main>
      {showModal ? (
        <CharacterModal character={selectedCharacter} handleClose={closeCharacterModal} />
      ) : null}
    </div>
  );
}

export default App;
