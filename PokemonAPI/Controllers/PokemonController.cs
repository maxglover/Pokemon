using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PokemonAPI.Models;
using PokemonAPI.Services;
using Microsoft.AspNetCore.Cors;

namespace PokemonAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors()]
    public class PokemonController : ControllerBase
    {
        private readonly PokemonService _pokemonService;

        public PokemonController()
        {
            _pokemonService = new PokemonService();
        }

        [HttpGet]
        public ActionResult<List<Pokemon>> GetAllPokemon()
        {
            return _pokemonService.GetAllPokemon();
        }


        [HttpGet("{name}")]
        public ActionResult<Pokemon> GetPokemonByName(string name)
        {
            var pokemon = _pokemonService.GetPokemonByName(name);
            if (pokemon == null)
            {
                return NotFound();
            }
            return pokemon;
        }
    }
}
