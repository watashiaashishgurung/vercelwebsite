const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;
  
  document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.querySelector('.navbar');
      const boxone = document.getElementById('boxone');
  
      navbar.addEventListener('mouseover', () => {
          boxone.style.marginTop = '16rem'; // Adjust this value to match the expanded height of the navbar
      });
  
      navbar.addEventListener('mouseout', () => {
          boxone.style.marginTop = '5rem'; // Reset to the original margin
      });
  
 

  // Add event listener for the fetch button
      const fetchButton = document.querySelector('button[onclick="fetchMultiplePokemon()"]');
      fetchButton.addEventListener('click', () => {
        const script = document.createElement('script');
        script.src = 'pokemonapi.js';
        script.onerror = () => {
          console.error('Failed to load pokemonapi.js');
        };
        document.body.appendChild(script);
      });
  });
  
  // Add a new recommendation to the list of recommendations
  // This function is called when the user clicks the 'Add' button
  
  function addRecommendation() {
    let recommendation = document.getElementById("new_recommendation");
    if (recommendation.value != null && recommendation.value.trim() != "") {
      console.log("New recommendation added");
      showPopup(true);
      var element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = "\<span\>&#8220;\</span\>" + recommendation.value + "\<span\>&#8221;\</span\>";
      document.getElementById("all_recommendations").appendChild(element); 
      recommendation.value = "";
      setTimeout(() => showPopup(false), 3000); // Hide popup after 3 seconds
    }
  }
  
  function showPopup(bool) {
    const popup = document.getElementById('popup');
    if (bool) {
      popup.innerHTML = "<p>Thank you for your recommendation! I will add after review</p>";
      popup.style.visibility = 'visible';
    } else {
      popup.style.visibility = 'hidden';
    }
  }
 

  // Pokemon API code here 

  async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
        throw new Error(`Pokemon not found: ${name}`);
    }
    return response.json();
}

async function fetchMultiplePokemon() {
    const names = document.getElementById('pokemonNames').value.split(',').map(name => name.trim());
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = ''; // Clear previous results

    for (const name of names) {
        try {
            const data = await fetchPokemon(name);
            const card = document.createElement('div');
            card.className = 'pokemon-card';

            const img = document.createElement('img');
            img.src = data.sprites.front_default;
            img.alt = name;

            const nameTag = document.createElement('p');
            nameTag.textContent = name.charAt(0).toUpperCase() + name.slice(1);

            card.appendChild(img);
            card.appendChild(nameTag);
            container.appendChild(card);
        } catch (error) {
            console.error(error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `Please make sure to call the right Pokémons ${name}: ${error.message}`;
            errorMsg.style.color = 'red';
            container.appendChild(errorMsg);
        }
    }
}

function resetPokemon() {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = ''; // Clear all fetched Pokémon
}

// End pokemon API code here