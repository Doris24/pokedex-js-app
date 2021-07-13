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

  // checks datatypes
  function checkType(pokemon) {
    if (typeof pokemon.name === typeof ''
          && typeof pokemon.height === typeof 0
          && typeof pokemon.types === typeof []
          && typeof pokemon === typeof [])  {
      return true;
    } else {
      return false;
    }
  }

  function add(pokemon) {
    if (checkType(pokemon) === true) {
      pokemonList.push(pokemon);
    } else {
      console.log("Check Datatypes");
    }
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

// function to find Pokemons by name
let lookup = "Charmander";
let pokemonFilter = pokemonRepository.getAll().filter((pokemon) => {
  return pokemon.name.toLowerCase() === lookup.toLowerCase();
});

console.log("filter: ", pokemonFilter);

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
