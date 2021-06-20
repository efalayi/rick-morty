import React, { useEffect, useState } from 'react';

import {getCharacters} from './api/http';
import {ICharacterModel} from './api/types';

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
        console.log('api error: ', error);
      }
      setIsLoading(false);
    }
    loadInitialData()
  }, []);

  return (
    <div className="app">
      <main className="app-main">
        <p>Rick and Morty Characters</p>

        {isLoading ? (<span>Loading...</span>) : (
        <div>
          <ul>
            {characters.map((character) => {
              return (
                <li key={character.id}>
                  <span className="block">{character.name}</span>
                  <span className="block">{character.species}</span>
                  <span className="block">{character.origin.name}</span>
                  <span className="block">{character.location.name}</span>
                  <span className="block">Episodes</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      </main>
    </div>
  );
}

export default App;
