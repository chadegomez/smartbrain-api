const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'smartbrain'
    }
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });

app.listen(4000, () => {
    console.log('app is running on port 4000')
})