// List of Pokemons
let pokemonList = [];

pokemonList[0] = {
  name: 'Bulbasaur',
  height: 7,
  types: ['grass', 'poison']};
pokemonList[1] = {
  name: 'Ivysaur',
  height: 10,
  types: ['grass', 'poison']};
pokemonList[2] = {
  name: 'Venusaur',
  height: 20,
  types: ['grass', 'poison']};
pokemonList[3] = {
  name: 'Charmander',
  height: 6,
  types: ['fire']};

for (var i = 0; i < pokemonList.length; i++) {
  // lists name and height of every Pokemon in Array
  document.write(pokemonList[i].name + ": " + pokemonList[i].height);
  // checks if height is above 15
  if (pokemonList[i].height > 15) {
      document.write(" Wow, that's big!");
  }
  // line break after each Pokemon
  document.write("<br>");
}
