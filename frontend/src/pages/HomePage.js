import React, { useState, useEffect } from 'react';
import { searchHeroByname, searchHeroById, editHero, saveHero } from './../graphql/queries';

function App() {
  const [search, setSearch] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  
  useEffect(() => {
    if (search.length >= 3) {
      fetchHeroByName(search).then(data => setHeroes(data));
    }
  }, [search]);

  useEffect(() => {
    
        editHero(selectedHero);
    
}, [selectedHero, editing]);


  const fetchHeroByName = async (name) => {
    const results = await searchHeroByname(name); 
    return results;
  }

  const fetchHeroById = async (id) => {
    const result = await searchHeroById(id);
    setSelectedHero(result);
  }

  const selectHero = (hero) => {
    fetchHeroById(hero.id);
  }

  const handleEditHero = () => {
    setEditing(true);
    setEditValues(selectedHero.powerstats);
  }

  const saveEdit = () => {
    setSelectedHero({...selectedHero, powerstats: editValues});
    setEditing(false);
};

  const handleSaveHero = () => {
    saveHero(selectedHero);
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/g.test(value)) {
      setSearch(value);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a1e0e9]">
      <div className="p-6 space-y-8 text-center">
        <h1 className="text-2xl font-bold">Superhero Search</h1>
        <input
          className="border p-2"
          placeholder="Search for a superhero..."
          value={search}
          onChange={handleSearchChange}
        />
        {heroes.length > 0 ? (
          <ul className="border p-2">
            {heroes.map(hero => (
              <li
                key={hero.id}
                onClick={() => selectHero(hero)}
                className="cursor-pointer"
              >
                {hero.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-red-500"></div>
        )}
        {selectedHero && (
          <div className="p-4 border">
            <h2 className="font-bold">{selectedHero.name}</h2>
            {editing ? (
              <>
                {Object.keys(selectedHero.powerstats).map(key => (
                  <div key={key}>
                    <label>{key}: </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={editValues[key]}
                      onChange={e => setEditValues({ ...editValues, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <button onClick={saveEdit}>submit</button>
              </>
            ) : (
              <>
                {Object.entries(selectedHero.powerstats).map(([key, value]) => (
                  <p key={key}>{key}: {value}</p>
                ))}
                <button onClick={handleEditHero}>edit</button>
              </>
            )}
            <img src={selectedHero.image.url} alt={selectedHero.name} />
            <button onClick={handleSaveHero}>save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
