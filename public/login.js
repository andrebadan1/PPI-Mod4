function login() {
    // Obtenha os valores dos campos de entrada
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Faça uma requisição ao servidor para processar o login
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Login bem-sucedido!');
            // Redirecione para o dashboard ou outra página desejada
            window.location.href = '/dashboard';
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro no login:', error);
        alert('Erro no login. Tente novamente. Consulte o console para obter mais informações.');
    });
}