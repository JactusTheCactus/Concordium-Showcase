// Fetch character data
function removeExtraSpaces(str) {
  return str.replace(/\s+/g, " ").trim();
}
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
    const character = characters[key]; // Access character data by key
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <h3><i>${character.name}</i><br>${character.rank}</h3>
      <p>${character.animal} ${character.alignment} of ${character.aspect}</p>
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
    document.getElementById('character-name').innerHTML = `<i>${character.name}</i> ${character.rank}`;

    const inverseCharacter = characters[character.inverse]
    function fullName(character) {
      return `<u>${character.name}</u> <u>${character.rank}</u>, <u>${character.animal}</u> ${character.alignment} of <u>${character.aspect}</u>`
    }

    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = `
      <u><b>${character.animal}</u> ${character.alignment} of <u>${character.aspect}</b></u>
      <p><strong>Species:</strong> <u>${character.species}</u><br>
      <strong>Power:</strong> <u>${character.power}</u><br>
      <strong>Gear Colour:</strong> <u>${character.colour}</u><br>
      <strong>Weapon:</strong> <u>${character.weapon}</u><br>
      <strong>Inverse:</strong><br>
      <i>${removeExtraSpaces(fullName(inverseCharacter))}</i></p>
      <a href="index.html">Back to Showcase</a>
    `;
  } else {
    // Handle case where character is not found
    document.getElementById('character-details').innerHTML = `
      <p>Character not found. <a href="index.html">Back to Showcase</a></p>
    `;
  }
}
