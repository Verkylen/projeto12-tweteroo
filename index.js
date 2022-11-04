import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

app.listen(5000);

const users = [];
const tweets = [];

let currentAvatar = '';

function check(req, res, property) {
    const {body} = req;

    const firstConditions = [
        Object.keys(body).length == 2,
        body.hasOwnProperty('username'),
        body.hasOwnProperty(property),
        typeof(body.username) === 'string',
        typeof(body[property]) === 'string'
    ];

    const secondConditions = [
        body.username !== '',
        body[property] !== ''
    ];

    if ( !firstConditions.reduce((prev, curr) => prev && curr) ) {
        res.sendStatus(400);
        return false;
    }

    if ( !secondConditions.reduce((prev, curr) => prev && curr) ) {
        res.status(400);
        res.send('Todos os campos são obrigatórios!');
        return false;
    }

    return true;
}

app.post('/sign-up', (req, res) => {
    const {body} = req;

    if (!check(req, res, 'avatar')) {
        return;
    }

    body['id'] = users.length;

    users.push(body);
    currentAvatar = body.avatar;

    res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
    const {body} = req;

    if (!check(req, res, 'tweet')) {
        return;
    }

    body['id'] = tweets.length;
    body['avatar'] = currentAvatar;

    tweets.push(body);

    res.status(201).send('OK');
});

app.get('/tweets', ({}, res) => {
    res.send(tweets.slice(-10));
});