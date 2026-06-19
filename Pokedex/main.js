const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`);
        const data = await response.json();

        data.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
};

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonStats = document.getElementById("pokemon-stats");
    const pokemonTitle = document.getElementById("title-Abilities");
    const pokemonAbilities = document.getElementById("pokemon-abilities");

    if (!pokemonUrl) {
        pokemonName.textContent = "";
        pokemonImage.src = "";
        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";

        pokemonTitle.style.display = "none";
        pokemonAbilities.style.display = "none";
        return;
    }

    try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();

        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = data.name;

        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";

        // ✅ MOSTRAR habilidades
        pokemonTitle.style.display = "block";
        pokemonAbilities.style.display = "block";

        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        data.abilities.forEach(abilityEntry => {
            const li = document.createElement("li");
            li.textContent = abilityEntry.ability.name;
            pokemonAbilities.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
};