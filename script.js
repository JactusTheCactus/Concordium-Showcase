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

  characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>Alignment: ${character.alignment}</p>
      <p>Rank: ${character.rank}</p>
      <a href="character.html?name=${character.name}">View Details</a>
    `;

    characterContainer.appendChild(card);
  });
}

// Function to load character details (for character.html)
function loadCharacterDetails(characters, characterName) {
  const character = characters.find(c => c.name === characterName);

  if (character) {
    // Populate character details
    document.getElementById('character-name').textContent = character.name;

    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p><strong>Alignment:</strong> ${character.alignment}</p>
      <p><strong>Rank:</strong> ${character.rank}</p>
      <p><strong>Power:</strong> ${character.power}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Inverse:</strong> ${character.inverse}</p>
    `;
  } else {
    // Handle case where character is not found
    document.getElementById('character-details').innerHTML = `
      <p>Character not found. <a href="index.html">Back to Showcase</a></p>
    `;
  }
}