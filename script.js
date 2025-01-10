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