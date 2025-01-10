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
        <p>${character.species}</p>
        <p>${character.power}</p>
        <p>${character.color}</p>
        <p>${character.weapon}</p>
        <p>${character.inverse}</p>
      `;

      // Append the card to the container
      characterContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading character data:', error));
