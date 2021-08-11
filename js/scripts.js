let pokemonRepository = (function () {
  // List of Pokemons
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // checks datatypes
  function checkType(pokemon) {
    if (typeof pokemon === "object"
          && "name" in pokemon)  {
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
    // call eventListener
    clickEvent(button, pokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        //console.log(pokemon); // lists all pokemon in console
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Add details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function clickEvent(element, pokemon) {
    element.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();

// // function to create new Pokemon
// function createNewPokemon() {
//   let newPokemon = {
//     name: 'newPokemon1',
//     height: 10,
//     types: ['water']
//   };
//   return newPokemon;
// }

// // add newPokemon to pokemonRepository
// pokemonRepository.add(createNewPokemon());

// function to find Pokemons by name
let lookup = "Charmander";
let pokemonFilter = pokemonRepository.getAll().filter((pokemon) => {
  return pokemon.name.toLowerCase() === lookup.toLowerCase();
});

//console.log("filter: ", pokemonFilter);

// function to list all pokemons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
