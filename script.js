// Fetch character data
fetch('characters.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    console.log('JSON fetched successfully');
    return response.json();
  })
  .then(data => {
    console.log('Parsed JSON:', data);

    const urlParams = new URLSearchParams(window.location.search);
    const characterName = urlParams.get('name');

    if (characterName) {
      loadCharacterDetails(data, characterName);
    } else {
      loadCharacterCards(data);
    }
  })
  .catch(error => console.error('Error fetching character data:', error));


// Function to load character cards (for index.html)
function loadCharacterCards(characters) {
  const characterContainer = document.getElementById('character-container');

  for (const key in characters) {
    const character = characters[key.toLowerCase()]; // Access character data by key
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <h3>${character.name} ${character.rank}</h3>
      <p>Species: ${character.species || 'Unknown'}</p>
      <p>Power: ${character.power}</p>
      <p>Gear Colour: ${character.colour}</p>
      <p>Weapon: ${character.weapon}</p>
      <a href="character.html?name=${character.name.toLowerCase()}">View Details</a>
    `;

    characterContainer.appendChild(card);
  }
}

// Function to load character details (for character.html)
function loadCharacterDetails(characters, characterName) {
  const character = characters[characterName.toLowerCase()]; // Match based on name (case insensitive)

  if (character) {
    // Populate character details
    document.getElementById('character-name').textContent = `${character.name} ${character.rank}, ${character.animal} sin of ${character.aspect}`;

    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = `
      <p><strong>Species:</strong> ${character.species || 'Unknown'}</p>
      <p><strong>Power:</strong> ${character.power}</p>
      <p><strong>Gear Colour:</strong> ${character.colour}</p>
      <p><strong>Weapon:</strong> ${character.weapon}</p>
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