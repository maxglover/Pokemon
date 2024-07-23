import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Compare.css';

const Compare = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchName2, setSearchName2] = useState('');
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);

    const typeEffectivenessChart = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fire: { grass: 2, ice: 2, bug: 2, steel: 2, fire: 0.5, water: 0.5, rock: 0.5, dragon: 0.5 },
        water: { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
        grass: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5, steel: 0.5 },
        electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, dragon: 0.5, ground: 0 },
        ice: { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
        fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, ghost: 0, fairy: 0.5 },
        poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
        ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
        flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
        psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
        bug: { grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5, fairy: 0.5 },
        rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
        ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
        dragon: { dragon: 2, steel: 0.5, fairy: 0 },
        dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
        steel: { ice: 2, rock: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
        fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 }
    };
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pokemon/`)
            .then(response => setPokemonList(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (searchName) {
            const result = pokemonList.find(pokemon => pokemon.name.toLowerCase().includes(searchName.toLowerCase()));
            setPokemon1(result);
        } else {
            setPokemon1(null);
        }
    }, [searchName, pokemonList]);

    useEffect(() => {
        if (searchName2) {
            const result = pokemonList.find(pokemon => pokemon.name.toLowerCase().includes(searchName2.toLowerCase()));
            setPokemon2(result);
        } else {
            setPokemon2(null);
        }
    }, [searchName2, pokemonList]);

    const getStatComparisonClass = (statName, statValue1, statValue2) => {
        if (statValue1 > statValue2) {
            return 'higher-stat';
        } else if (statValue1 < statValue2) {
            return 'lower-stat';
        } else {
            return '';
        }
    };

    const getEffectivenessClass = (type1, type2) => {
        const effectiveness = typeEffectivenessChart[type1.toLowerCase()]?.[type2.toLowerCase()] || 1;
        if (effectiveness > 1) return 'higher-stat';
        if (effectiveness < 1) return 'lower-stat';
        return '';
    };

    return (
        <div className='comp'>
            <div>
                <input
                    type="text"
                    placeholder="Enter Pokemon Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                {pokemon1 && <h2>{pokemon1.name}</h2>}
                {pokemon1 && <img src={pokemon1.image} alt={pokemon1.name}></img>}
                {pokemon1 && <div className='stat'>
                    <p>Stats:</p>
                    <ul>
                        {pokemon1.stats.map(stat => {
                            const pokemon2Stat = pokemon2 ? pokemon2.stats.find(s => s.name === stat.name) : null;
                            const statClass = pokemon2Stat ? getStatComparisonClass(stat.name, stat.value, pokemon2Stat.value) : '';
                            return (
                                <li key={stat.name} className={statClass}>
                                    {stat.name}: {stat.value}
                                </li>
                            );
                        })}
                    </ul>
                </div>}
                {pokemon1 && <h3>Types: {pokemon1.types.join(', ')}</h3>}
                {pokemon1 && pokemon2 && <div className='effectiveness'>
                    <p>Effectiveness against {pokemon2.name}:</p>
                    <ul>
                        {pokemon1.types.map(type1 => (
                            pokemon2.types.map(type2 => (
                                <li key={`${type1}-${type2}`} className={getEffectivenessClass(type1, type2)}>
                                    {type1} vs {type2}
                                </li>
                            ))
                        ))}
                    </ul>
                </div>}

            </div>

            <div>
                <img src='/vs.jpg' alt='vs'/>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter Pokemon Name"
                    value={searchName2}
                    onChange={(e) => setSearchName2(e.target.value)}
                />
                {pokemon2 && <h2>{pokemon2.name}</h2>}
                {pokemon2 && <img src={pokemon2.image} alt={pokemon2.name}></img>}
                {pokemon2 && <div className='stat'>
                    <p>Stats:</p>
                    <ul>
                        {pokemon2.stats.map(stat => {
                            const pokemon1Stat = pokemon1 ? pokemon1.stats.find(s => s.name === stat.name) : null;
                            const statClass = pokemon1Stat ? getStatComparisonClass(stat.name, stat.value, pokemon1Stat.value) : '';
                            return (
                                <li key={stat.name} className={statClass}>
                                    {stat.name}: {stat.value}
                                </li>
                            );
                        })}
                    </ul>
                </div>}
                {pokemon2 && <h3>Types: {pokemon2.types.join(', ')}</h3>}
                {pokemon1 && pokemon2 && <div className='effectiveness'>
                    <p>Effectiveness against {pokemon1.name}:</p>
                    <ul>
                        {pokemon2.types.map(type2 => (
                            pokemon1.types.map(type1 => (
                                <li key={`${type2}-${type1}`} className={getEffectivenessClass(type2, type1)}>
                                    {type2} vs {type1}
                                </li>
                            ))
                        ))}
                    </ul>
                </div>}

            </div>
        </div>
    );
};

export default Compare;
