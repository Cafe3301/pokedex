let limit = 15; // Limite inicial
let offset = 0;

const pokemonList = document.getElementById('pokemon-list');
const botao = document.getElementById('buttonMore');

async function loadPokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const chamarApi = await fetch(url);

  if (chamarApi.status === 200) {
    const dados = await chamarApi.json();
    const result = dados.results;

    result.forEach((pokemon, index) => {
      const pokemonId = offset + index + 1; // Atualiza o ID do Pokémon
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'pokemon-card';

      const pokemonImage = document.createElement('img');
      pokemonImage.src = imageUrl;
      pokemonImage.alt = pokemon.name;

      const pokemonItem = document.createElement('h2');
      pokemonItem.textContent = pokemon.name;

      const pokemonNumber = document.createElement('p');
      pokemonNumber.textContent = `#${pokemonId}`;
      pokemonNumber.className = 'pokemon-number';

      // Criar um link para a página de detalhes
      const link = document.createElement('a');
      link.href = `pokemon.html?name=${pokemon.name}`; // Link para a página de detalhes
      link.appendChild(pokemonDiv);

      // Adicionar imagem e nome ao card
      pokemonDiv.appendChild(pokemonImage);
      pokemonDiv.appendChild(pokemonItem);
      pokemonDiv.appendChild(pokemonNumber);

      // Adicionar o card ao link e o link à lista
      pokemonList.appendChild(link);
    });
  }
}

botao.addEventListener('click', function() {
  limit += 10; 
  offset += 10; 
  loadPokemons(); 
});

loadPokemons();
