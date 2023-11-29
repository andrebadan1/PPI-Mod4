const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
  secret: 'secretpassword', 
  resave: true, 
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 dias de validade
}));

// Dados temporários para simular armazenamento interno
const usuarios = [];

// Rota padrão (rota raiz) redireciona para a página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastro.html'));
});

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar as credenciais
    const usuarioEncontrado = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioEncontrado) {
        req.session.user = username;

        // Configurar cookies
        const now = new Date();
        const ultimoAcesso = now.toISOString();
        res.cookie('ultimoAcesso', ultimoAcesso, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.cookie('nomeUsuario', username, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});
// Rota para cadastrar
app.post('/cadastrar', (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = usuarios.find(user => user.username === username);

    if (usuarioExistente) {
        res.json({ success: false, message: 'Usuário já existe.' });
    } else {
        // Adicionar o novo usuário à lista
        usuarios.push({ username, password });

        // Indicar sucesso no cadastro
        res.json({ success: true, message: 'Cadastro realizado com sucesso. Você será redirecionado para o login.', username });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


