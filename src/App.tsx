import React, { useEffect, useState } from "react";

import Character from "./components/character/index";
import { getCharacters } from "./api/http";
import { ICharacterModel } from "./api/types";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<ICharacterModel[]>([]);

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
        <p>Rick and Morty Characters</p>

        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <div className="flex flex-row flex-wrap">
            {characters.map((character) => {
              return (
                <Character key={character.id} {...character} />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
