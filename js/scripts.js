let pokemonRepository = (function () {
  // List of Pokemons
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 7,
      types: ['grass', 'poison']
    },
    {
      name: 'Ivysaur',
      height: 10,
      types: ['grass', 'poison']
    },
    {
      name: 'Venusaur',
      height: 20,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 6,
      types: ['fire']
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  }
})();

// create new Pokemon
function createNewPokemon() {
  let newPokemon = {
    name: 'newPokemon1',
    height: 10,
    types: ['water']
  };
  return newPokemon;
}

// add newPokemon to pokemonRepository
pokemonRepository.add(createNewPokemon());

pokemonRepository.getAll().forEach(function(pokemon) {
  // lists name and height of every Pokemon in Array
  document.write(pokemon.name + "(height: " + pokemon.height + ")" )
  // checks if height is above 15
  if (pokemon.height > 15) {
    document.write(" Wow, that's big");
  }
  // line break after each Pokemon
  document.write("<br>");
});
