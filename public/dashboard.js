function cadastrar() {
    // Obter dados do formulário
    const nome = document.getElementById('nome').value;
    const curso = document.getElementById('curso').value;
    const ra = document.getElementById('ra').value;

    // Validar se os campos não estão vazios
    if (!nome || !curso || !ra) {
        alert('Preencha todos os campos do formulário.');
        return;
    }

    // Adicionar os dados à tabela
    adicionarLinhaTabela(nome, curso, ra);

    // Limpar os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('ra').value = '';
}

function adicionarLinhaTabela(nome, curso, ra) {
    // Adicionar uma nova linha à tabela
    const tabela = document.getElementById('tabelaDados');
    const novaLinha = tabela.insertRow();
    
    // Adicionar células à nova linha
    const cellNome = novaLinha.insertCell(0);
    const cellCurso = novaLinha.insertCell(1);
    const cellRA = novaLinha.insertCell(2);
    const cellExcluir = novaLinha.insertCell(3);

    // Preencher as células com os dados
    cellNome.textContent = nome;
    cellCurso.textContent = curso;
    cellRA.textContent = ra;

    // Adicionar um checkbox para excluir
    const checkboxExcluir = document.createElement('input');
    checkboxExcluir.type = 'checkbox';
    cellExcluir.appendChild(checkboxExcluir);
}

// Função para excluir linhas selecionadas
function excluirSelecionados() {
    const tabela = document.getElementById('tabelaDados');
    const linhasSelecionadas = [];

    // Encontrar as linhas selecionadas
    for (let i = 1; i < tabela.rows.length; i++) {
        const checkbox = tabela.rows[i].cells[3].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            linhasSelecionadas.push(i);
        }
    }

    // Remover as linhas selecionadas (em ordem inversa para não afetar o índice)
    for (let i = linhasSelecionadas.length - 1; i >= 0; i--) {
        tabela.deleteRow(linhasSelecionadas[i]);
    }
}
function exibirInfoUsuario() {
    fetch('/infoUsuario')
        .then(response => response.json())
        .then(data => {
            const nomeUsuarioElemento = document.getElementById('nomeUsuario');
            const ultimoAcessoElemento = document.getElementById('ultimoAcesso');

            // Verificar se os dados foram retornados corretamente
            if (data && data.nomeUsuario && data.ultimoAcesso) {
                nomeUsuarioElemento.textContent = data.nomeUsuario;
                ultimoAcessoElemento.textContent = formatarData(data.ultimoAcesso);
            } else {
                console.error('Dados de usuário não retornados corretamente:', data);
            }

            // Função para formatar a data conforme necessário
            function formatarData(data) {
                const dataFormatada = new Date(data).toLocaleString();
                return dataFormatada;
            }
        })
        .catch(error => console.error('Erro ao obter informações do usuário:', error));
}

// Carregar informações do usuário e a tabela ao iniciar
exibirInfoUsuario();
carregarTabela();
