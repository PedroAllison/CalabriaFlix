const produtosSection = document.getElementById('filme');

const fetchFilmes = async () => {
    try {
        const response = await fetch('https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/listar/filmes');
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();
        return data.filmes || [];
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        return [];
    }
};

const createCard = (filme) => {
    const card = document.createElement('div');
    card.classList.add('card-filme');

    card.innerHTML = `
        <figure>
            <img src="${filme.image}" alt="${filme.nome}">
        </figure>
        <span class="filmeNome">${filme.nome}</span>
        <p class="filmeSinopse">${filme.sinopse}</p>
        <span class="valor-atual">R$ ${filme.valor.toFixed(2)}</span>
    `;
    return card;
};

const renderFilmes = async () => {
    const filmes = await fetchFilmes();
    
    if (filmes.length === 0) {
        produtosSection.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    produtosSection.innerHTML = '';
    
    filmes.forEach(filme => {
        const card = createCard(filme);
        produtosSection.appendChild(card);
    });
};


renderFilmes();
