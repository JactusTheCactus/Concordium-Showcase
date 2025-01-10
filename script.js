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
