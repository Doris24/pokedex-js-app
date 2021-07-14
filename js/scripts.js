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

  function addListItem(pokemon) {
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    pokeList.appendChild(listItem);
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);

    clickEvent(button, pokemon);
  }

  function clickEvent(element, pokemon) {
    element.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll
  }
})();

// function to create new Pokemon
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

//console.log("filter: ", pokemonFilter);

// function to list all pokemons
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
