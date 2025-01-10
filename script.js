// Fetch character data
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    const urlParams = new URLSearchParams(window.location.search);
    const characterName = urlParams.get('name'); // Check for "name" parameter in the URL

    if (characterName) {
      // We're on the character.html page
      loadCharacterDetails(data.characters, characterName);
    } else {
      // We're on the index.html page
      loadCharacterCards(data.characters);
    }
  })
  .catch(error => console.error('Error fetching character data:', error));

// Function to load character cards (for index.html)
function loadCharacterCards(characters) {
  const characterContainer = document.getElementById('character-container');

  Object.values(characters).forEach(character => {
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <h3>${character.name} (${character.rank})</h3>
      <p><strong>Species:</strong> ${character.species || 'Unknown'}</p>
      <p><strong>Power:</strong> ${character.power || 'Unknown'}</p>
      <p><strong>Gear Colour:</strong> ${character.colour || 'Unknown'}</p>
      <p><strong>Weapon:</strong> ${character.weapon || 'None'}</p>
      <a href="character.html?name=${character.name}">View Details</a>
    `;

    characterContainer.appendChild(card);
  });
}

// Function to load character details (for character.html)
function loadCharacterDetails(characters, characterName) {
  const character = Object.values(characters).find(c => c.name === characterName);

  if (character) {
    // Populate character details
    document.getElementById('character-name').textContent = `${character.name} (${character.rank})`;

    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = `
      <p><strong>Aspect:</strong> ${character.aspect}</p>
      <p><strong>Species:</strong> ${character.species || 'Unknown'}</p>
      <p><strong>Power:</strong> ${character.power || 'Unknown'}</p>
      <p><strong>Gear Colour:</strong> ${character.colour || 'Unknown'}</p>
      <p><strong>Weapon:</strong> ${character.weapon || 'None'}</p>
      <p><strong>Animal:</strong> ${character.animal || 'None'}</p>
      <p><strong>Epithet:</strong> ${character.epithet || 'None'}</p>
      <p><strong>Alignment:</strong> ${character.alignment}</p>
      <p><strong>Inverse:</strong> ${character.inverse}</p>
      <a href="index.html">Back to Showcase</a>
    `;
  } else {
    // Handle case where character is not found
    document.getElementById('character-details').innerHTML = `
      <p>Character not found. <a href="index.html">Back to Showcase</a></p>
    `;
  }
}