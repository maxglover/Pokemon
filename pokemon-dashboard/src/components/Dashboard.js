import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [summary, setSummary] = useState({
        total: 0,
        types: {},
        generations: {}
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    const [filterNumber, setFilterNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterGeneration, setFilterGeneration] = useState('');
    const [filterMoves, setFilterMoves] = useState('');



    useEffect(() => {
        axios.get('http://localhost:5000/api/pokemon')
            .then(response => {
                setPokemonList(response.data);
                // Compute summary data
                const types = {};
                const generations = {};
                response.data.forEach(pokemon => {
                    pokemon.types.forEach(type => {
                        types[type] = (types[type] || 0) + 1;
                    });
                    generations[pokemon.generation] = (generations[pokemon.generation] || 0) + 1;
                });
                setSummary({
                    total: response.data.length,
                    types,
                    generations
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredPokemonList = [...pokemonList];

    if (filterNumber) {
        filteredPokemonList = filteredPokemonList.filter(pokemon => String(pokemon.number) === filterNumber);
    }

    if (filterName) {
        filteredPokemonList = filteredPokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(filterName.toLowerCase()));
    }

    if (filterType && filterType !== '') {
        filteredPokemonList = filteredPokemonList.filter(pokemon => pokemon.types.includes(filterType));
    }

    if (filterGeneration && filterGeneration !== '') {
        filteredPokemonList = filteredPokemonList.filter(pokemon => pokemon.generation === filterGeneration);
    }

    if (filterMoves) {
        filteredPokemonList = filteredPokemonList.filter(pokemon => pokemon.moves.includes(filterMoves));
    }


    const paginatedPokemonList = filteredPokemonList.slice(startIndex, endIndex);

    return (
        <div>
            <div className='summary'>
                <h2>Meet Our Pokemon!</h2>

                <div className='col'>
                    <p>Total Pokemon: {summary.total}</p>
                </div>

                    <div className='row'>
                        <div>
                            <p>Types:</p>
                            <ul>
                                {Object.entries(summary.types).map(([type, count]) => (
                                    <li key={type}>{type}: {count}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p>Generations:</p>
                            <ul>
                                {Object.entries(summary.generations).map(([generation, count]) => (
                                    <li key={generation}>{generation}: {count}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
            </div>
            <div className='table'>
                <h2>Pokemon List</h2>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    {Object.keys(summary.types).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <select value={filterGeneration} onChange={(e) => setFilterGeneration(e.target.value)}>
                    <option value="">All Generations</option>
                    {Object.keys(summary.generations).map((gen) => (
                        <option key={gen} value={gen}>{gen}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Search by Number"
                    value={filterNumber}
                    onChange={(e) => setFilterNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Search by Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Search by Moves"
                    value={filterMoves}
                    onChange={(e) => setFilterMoves(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Generation</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Type 1</th>
                            <th>Type 2</th>
                            <th>Moves Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPokemonList.map(pokemon => (
                            <tr key={pokemon.number}>
                                <td>{pokemon.number}</td>
                                <td><Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link></td>
                                <td>{pokemon.generation}</td>
                                <td>{pokemon.height}</td>
                                <td>{pokemon.weight}</td>
                                <td>{pokemon.types[0]}</td>
                                <td>{pokemon.types[1] || 'N/A'}</td>
                                <td>{pokemon.moves.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    Page {currentPage} of {Math.ceil(filteredPokemonList.length / itemsPerPage)}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPokemonList.length / itemsPerPage)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
