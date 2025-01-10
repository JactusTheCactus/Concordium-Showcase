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
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Alignment: ${character.alignment}</p>
        <p>Rank: ${character.rank}</p>
        <p>Power: ${character.power}</p>
        <p>Species: ${character.species}</p>
        <p>Inverse: ${character.inverse}</p>
      `;

      // Append the card to the container
      characterContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading character data:', error));

// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const characterName = urlParams.get('name'); // e.g., "Invidia"

// Fetch the character data
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    // Find the specific character by name
    const character = data.characters.find(c => c.name === characterName);

    if (character) {
      // Populate the character details page
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
      // Handle if character is not found
      document.getElementById('character-details').innerHTML = `<p>Character not found!</p>`;
    }
  })
  .catch(error => console.error('Error loading character data:', error));