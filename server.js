const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const auth = require('basic-auth');
const compare = require('tsscmp');
const cors = require('cors');

app.use(cors({ origin: '*' }));

const users = [
  { username: 'admin', password: 'admin' },
  { username: 'jhon', password: 'doe' },
  { username: 'chad', password: 'bob' },
];

const check = (name, pass) => {
  return users.some(user => {
    return compare(user.username, name) && compare(user.password, pass);
  });
};

app.post('/auth', (req, res) => {
  const cre = auth(req);
  console.log(cre);
  const isValid = check(cre.name, cre.pass);

  if (isValid) {
    return res.json({ success: true, username: cre.name });
  } else {
    return res.json({ success: false });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
  socket.on('message', message => {
    console.log(message);
    socket.broadcast.emit('messageReceive', message);
  });
});

http.listen(9999, '192.168.1.12', () => {
  console.log('server is running on port 9999');
});
