using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using PokemonAPI.Models;

namespace PokemonAPI.Services
{
    public class PokemonService
    {
        private readonly List<Pokemon> _pokemonList;

        public PokemonService()
        {
            var jsonData = System.IO.File.ReadAllText("../pokemon.json");
            _pokemonList = JsonConvert.DeserializeObject<List<Pokemon>>(jsonData);
        }

        public List<Pokemon> GetAllPokemon() => _pokemonList;
        public Pokemon GetPokemonByName(string name) => _pokemonList.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }
}
