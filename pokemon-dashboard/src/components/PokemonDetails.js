import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/PokemonDetails.css';

const PokemonDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pokemon/${name}`)
            .then(response => setPokemon(response.data));
    }, [name]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Number: {pokemon.number}</p>
            <p>Generation: {pokemon.generation}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.join(', ')}</p>
            <p>Stats:</p>
            <ul>
                {pokemon.stats.map(stat => (
                    <li key={stat.name}>{stat.name}: {stat.value}</li>
                ))}
            </ul>
            <p>Moves: {pokemon.moves.join(', ')}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <p>Evolution:</p>
            {pokemon.evolution.from && <p>From: <Link to={`/pokemon/${pokemon.evolution.from}`}>{pokemon.evolution.from}</Link></p>}
            {pokemon.evolution.to.length > 0 && <p>To: {pokemon.evolution.to.map(evo => <Link key={evo} to={`/pokemon/${evo}`}>{evo}</Link>)}</p>}
        </div>
    );
};

export default PokemonDetails;
