let pokemonRepository = (function () {
  // List of Pokemons
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // let modalContainer = document.querySelector('#exampleModal');

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
    button.classList.add('group-list-item');
    button.classList.add('btn');
    button.classList.add('btn-info');
    button.classList.add('btn-block');
    let attToggle = document.createAttribute("data-toggle");
    attToggle.value = "modal";
    button.setAttributeNode(attToggle);
    let attTarget = document.createAttribute("data-target");
    attTarget.value = "#exampleModal";
    button.setAttributeNode(attTarget);
    // button.attr("data-toggle", "modal");
    // button.attr("data-target", "#exampleModal");

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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
      // showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrlFront, pokemon.imageUrlBack);
    });
  }

  function clickEvent(element, pokemon) {
    element.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    // creating elements in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width=50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width=50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    //let weightElement = $("<p>" + "Weight: " + weight + "</p>");
    //let typesElement = $("<p>" + "Types: " + typesElement + "</p>");
    //let abilitiesElement = $("<p>" + "Abilities: " + abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    // modalBody.append(weightElement);
    // modalBody.append(typesElement);
    // modalBody.append(abilitiesElement);
  }

  // function showModal(title, text, image) {
  //   let modalBody = $(".modal-body");
  //   let modalTitle = $(".modal-title");
  //   let modalHeader = $(".modal-header");
  //
  //   modalTitle.empty();
  //   modalBody.empty();
  //
  //   // clear already existing text
  //   modalContainer.innerText = '';
  //   // add html elements
  //   let modal = document.createElement('div');
  //   modal.classList.add('modal');
  //
  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'Close';
  //   closeButtonElement.addEventListener('click', hideModal);
  //
  //   let titleElement = document.createElement('h1');
  //   titleElement.innerText = title;
  //
  //   let contentElement = document.createElement('p');
  //   contentElement.innerText = text;
  //
  //   let imgElement = document.createElement('img');
  //   imgElement.src = image;
  //
  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(titleElement);
  //   modal.appendChild(contentElement);
  //   modal.appendChild(imgElement);
  //   modalContainer.appendChild(modal);
  //
  //   modalContainer.classList.add('is-visible');
  // }
  //
  // function hideModal() {
  //   modalContainer.classList.remove('is-visible');
  // }
  //
  // // close Modal with Esc
  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });
  //
  // // close Modal with mouse click on the modalContainer
  // modalContainer.addEventListener('click', (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

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
