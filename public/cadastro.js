function cadastrar() {
    // Obtenha os valores dos campos de entrada
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Faça uma requisição ao servidor para processar o cadastro
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Mostra a mensagem do servidor

        if (data.success) {
            // Redirecione para a página de login com os parâmetros de usuário preenchidos
            window.location.href = `/login?username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(password)}`;
        }
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        alert('Erro no cadastro. Tente novamente.');
    });
}