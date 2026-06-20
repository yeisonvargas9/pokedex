const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

// Cargar Pokémons al select
const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon?limit=151`);
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

// Escuchar el cambio en el select
pokemonList.addEventListener("change", (e) => {
    pokemonSelected(e.target.value);
});

// Mostrar la info basada en tu diseño
const pokemonSelected = async (pokemonUrl) => {
    const pokemonInfo = document.getElementById("pokemon-info");
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    
    const pokemonTypesTitle = document.getElementById("title-Types");
    const pokemonTypesContainer = document.getElementById("pokemon-types");
    
    const pokemonAbilities = document.getElementById("pokemon-abilities");
    const pokemonStats = document.getElementById("pokemon-stats");

    // Si vuelve a la opción vacía, ocultamos todo
    if (!pokemonUrl) {
        pokemonInfo.style.display = "none";
        return;
    }

    try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();

        // Limpiar los contenedores anteriores
        pokemonTypesContainer.innerHTML = "";
        pokemonAbilities.innerHTML = "";
        pokemonStats.innerHTML = "";

        // Imagen y Nombre
        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = data.name;

        // Ocultar los tipos al cargar un nuevo Pokémon (hasta que se pase el cursor)
        pokemonTypesTitle.style.display = "none";
        pokemonTypesContainer.style.display = "none";

        // Cargar los Tipos usando tus clases (.type-chip)
        data.types.forEach(t => {
            const span = document.createElement("span");
            span.classList.add("type-chip");
            span.textContent = t.type.name;
            pokemonTypesContainer.appendChild(span);
        });

        // Cargar las Habilidades
        data.abilities.forEach(abilityEntry => {
            const li = document.createElement("li");
            li.textContent = abilityEntry.ability.name;
            pokemonAbilities.appendChild(li);
        });

        // Cargar TODAS las estadísticas
        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        // Mostrar el contenedor de información principal
        pokemonInfo.style.display = "block";

        // ==========================================
        // EFECTO HOVER CON JS: Mostrar/Ocultar tipos
        // ==========================================
        
        // Cuando el cursor entra a la imagen, se muestran los tipos
        pokemonImage.onmouseenter = () => {
            pokemonTypesTitle.style.display = "block";
            pokemonTypesContainer.style.display = "flex"; // Usamos flex para que mantenga tus estilos CSS
        };

        // Cuando el cursor sale de la imagen, se vuelven a ocultar
        pokemonImage.onmouseleave = () => {
            pokemonTypesTitle.style.display = "none";
            pokemonTypesContainer.style.display = "none";
        };

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
};