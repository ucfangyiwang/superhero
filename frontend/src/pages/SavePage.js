import React, { useState, useEffect } from 'react';
import { getSavedHeroes, unsaveHero } from '../graphql/queries';

const SavedHeroes = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const savedHeroes = await getSavedHeroes();
      setHeroes(savedHeroes);
    };

    fetchHeroes();
  }, []);

  const handleUnsave = async (id) => {
    await unsaveHero(id);
    setHeroes(heroes.filter((hero) => hero.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a1e0e9]">
      <div className="p-6 space-y-8 text-center">
        <h1 className="text-2xl font-bold">Saved Heroes</h1>
        {heroes.length > 0 && (
          <ul className="border p-2">
            {heroes.map((hero) => (
              <li key={hero.id} className="my-4">
                <h2 className="text-lg font-bold">{hero.name}</h2>
                <p>ID: {hero.id}</p>
                <img src={hero.image.url} alt={hero.name} />
                {Object.entries(hero.powerstats).map(([key, value]) => (
                  <p key={key}>{key}: {value}</p>
                ))}
                <button onClick={() => handleUnsave(hero.id)}>Unsave Hero</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedHeroes;
