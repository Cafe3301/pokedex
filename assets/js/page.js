async function fetchPokemonDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const pokemonName = params.get('name');

        // Se não houver nome de Pokémon na URL, exiba uma mensagem de erro
        if (!pokemonName) {
            document.getElementById('pokemon-name').textContent = "Pokémon não encontrado!";
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        
        // Verificação se a API retorna corretamente
        if (!response.ok) {
            throw new Error('Pokémon não encontrado.');
        }

        const pokemon = await response.json();

        // Preenchendo nome e imagem
        document.getElementById('pokemon-name').textContent = pokemon.name;

        // Verificar se o elemento pokemon-id existe antes de usá-lo
        const pokemonIdElement = document.getElementById('pokemon-id');
        if (pokemonIdElement) {
            pokemonIdElement.textContent = `#${pokemon.id}`;
        }

        document.getElementById('pokemon-image').src = pokemon.sprites.front_default;

        // Preenchendo informações de altura, peso e tipo
        document.getElementById('pokemon-height').textContent = (pokemon.height / 10).toFixed(1) + " m"; // Conversão para metros
        document.getElementById('pokemon-weight').textContent = (pokemon.weight / 10).toFixed(1) + " kg"; // Conversão para kg
        document.getElementById('pokemon-type').textContent = pokemon.types.map(type => type.type.name).join(', ');

        // Preenchendo os movimentos (mostrando até dois)
        const moves = pokemon.moves.slice(0, 2).map(move => move.move.name).join(', ');
        document.getElementById('pokemon-moves').textContent = moves || "Sem movimentos";

        // Preenchendo as estatísticas base
        const statsList = document.getElementById('pokemon-stats');
        statsList.innerHTML = ''; // Limpa lista antes de preencher
        pokemon.stats.forEach(stat => {
            const statItem = document.createElement('li');
            statItem.innerHTML = `<strong>${stat.stat.name.toUpperCase()}:</strong> ${stat.base_stat}`;
            statsList.appendChild(statItem);
        });
    } catch (error) {
        // Exibir mensagem de erro se houver problema na requisição
        document.getElementById('pokemon-name').textContent = error.message;
    }
}

// Certifique-se de que o conteúdo da página está carregado antes de buscar os detalhes
document.addEventListener("DOMContentLoaded", () => {
    fetchPokemonDetails();
});
