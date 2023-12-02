const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Adicionado o pacote cors

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
app.use(cors());  // Adicionado middleware CORS

const usuarios = [
  { username: 'usuario', password: 'senha' }
];

function verificarCredenciais(username, password) {
  return usuarios.some(user => user.username === username && user.password === password);
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (verificarCredenciais(username, password)) {
    req.session.user = username;

    const now = new Date();
    const ultimoAcesso = now.toISOString();
    res.cookie('ultimoAcesso', ultimoAcesso, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie('nomeUsuario', username, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('/infoUsuario', (req, res) => {
  const nomeUsuario = req.session.user || '';
  const ultimoAcesso = req.cookies.ultimoAcesso || '';

  res.json({ nomeUsuario, ultimoAcesso });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/dadosTabela', (req, res) => {
  const dados = [
    { id: 1, nome: 'Exemplo 1' },
    { id: 2, nome: 'Exemplo 2' },
  ];

  res.json(dados);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

