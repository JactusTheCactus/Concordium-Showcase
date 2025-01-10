// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const characterName = urlParams.get('name'); // e.g., "Invidia"

// Fetch the character data from the JSON file
fetch('characters.json')
  .then(response => response.json()) // Parse the JSON
  .then(data => {
    const characterContainer = document.getElementById('character-container');

    // Loop through each character and create a card
    data.characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('character-card');
      
      card.innerHTML = `
        <h3>${character.name} ${character.rank}, ${character.animal} sin of ${character.sin}</h3>
        <p>Species: ${character.species}</p>
        <p>Power: ${character.power}</p>
        <p>Gear Colour: ${character.color}</p>
        <p>Weapon: ${character.weapon}</p>
        <p>Inverse Concordant: ${character.inverse}</p>
        <a href="character.html?name=${character.name}">View Details</a>
      `;

      // Append the card to the container
      characterContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading character data:', error));
