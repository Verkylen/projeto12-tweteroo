import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

app.listen(5000);

const users = [];
const tweets = [];

let currentAvatar = '';

app.post('/sign-up', (req, res) => {
    const {body} = req;
    body['id'] = users.length;

    users.push(body);
    currentAvatar = body.avatar;

    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const {body} = req;
    body['id'] = tweets.length;
    body['avatar'] = currentAvatar;

    tweets.push(body);

    res.send('OK');
});

app.get('/tweets', ({}, res) => {
    res.send(tweets.slice(-10));
});