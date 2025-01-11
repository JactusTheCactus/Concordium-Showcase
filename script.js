// Fetch character data
fetch('characters.json')
function fullName(character) {
  return `${character.name} ${character.rank || ''}`;
}
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
    const character = characters[key]; // Access character data by key
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <h3><i>${character.name}</i><br>${character.rank}</h3>
      <p>Species: ${character.species || 'Unknown'}</p>
      <p>Power: ${character.power}</p>
      <p>Gear Colour: ${character.colour}</p>
      <p>Weapon: ${character.weapon}</p>
      <a href="character.html?name=${character.name}">View Details</a>
    `;

    characterContainer.appendChild(card);
  }
}

// Function to load character details (for character.html)
function loadCharacterDetails(characters, characterName) {
  // Normalize characterName for case-insensitive matching
  const normalizedCharacterName = characterName.toLowerCase();

  // Find the matching character object
  const character = Object.values(characters).find(
    char => char.name.toLowerCase() === normalizedCharacterName
  );

  if (character) {
    // Populate character details
    document.getElementById('character-name').innerHTML = `<u><i>${character.name}</i></u> <u>${character.rank}</u>`;

    const inverseCharacter = characters[character.inverse]

    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = `
      <u><b>${character.animal}</u> ${character.alignment} of <u>${character.aspect}</b></u>
      <p><strong>Species:</strong> ${character.species}<br>
      <strong>Power:</strong> ${character.power}<br>
      <strong>Gear Colour:</strong> ${character.colour}<br>
      <strong>Weapon:</strong> ${character.weapon}<br>
      <strong>Inverse:</strong><br>
      <i>${inverseCharacter.fullName || 'unknown'}</i></p>
      <a href="index.html">Back to Showcase</a>
    `;
  } else {
    // Handle case where character is not found
    document.getElementById('character-details').innerHTML = `
      <p>Character not found. <a href="index.html">Back to Showcase</a></p>
    `;
  }
}
