import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PokemonDetails from './components/PokemonDetails';
import Compare from './components/Compare';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pokemon/:name" element={<PokemonDetails />} />
                <Route path="/compare" element={<Compare />} />
            </Routes>
        </Router>
    );
};

export default App;
