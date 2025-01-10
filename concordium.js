fetch('concordium.json')
  .then(response => response.json())
  .then(data => {
    data.concordants.forEach(concordant => {
      const card = document.createElement('div');
      card.classList.add('character-card');
      card.innerHTML = `
        <img src="${concordant.image}" alt="${concordant.name}">
        <h3>${concordant.name}</h3>
        <p>Alignment: ${concordant.alignment}</p>
        <p>Rank: ${concordant.rank}</p>
      `;
      document.querySelector('.concordant-container').appendChild(card);
    });
  });