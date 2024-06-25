import 'dotenv/config';
import express from 'express'; // this is ES module syntax
import {myGithub} from './githubAPI.js'; // we have to specify the file extesnion in ES module syntax

// require('dotenv').config();
// const express = require('express');
// const myGithub = require('./githubAPI');



const app = express();
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/login', (req,res) => {
    res.send('<h1> Login Page </h1>');
})

app.get('/danyal', (req, res) => {
    res.send('Hello Danyal');
})

app.get('/github', (req, res) => {
    res.json(myGithub);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// const myGithub = {
//     "login": "Danyal-Rana",
//     "id": 100080102,
//     "node_id": "U_kgDOBfcZ5g",
//     "avatar_url": "https://avatars.githubusercontent.com/u/100080102?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/Danyal-Rana",
//     "html_url": "https://github.com/Danyal-Rana",
//     "followers_url": "https://api.github.com/users/Danyal-Rana/followers",
//     "following_url": "https://api.github.com/users/Danyal-Rana/following{/other_user}",
//     "gists_url": "https://api.github.com/users/Danyal-Rana/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/Danyal-Rana/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/Danyal-Rana/subscriptions",
//     "organizations_url": "https://api.github.com/users/Danyal-Rana/orgs",
//     "repos_url": "https://api.github.com/users/Danyal-Rana/repos",
//     "events_url": "https://api.github.com/users/Danyal-Rana/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/Danyal-Rana/received_events",
//     "type": "User",
//     "site_admin": false,
//     "name": "Muhammad Danyal Rana",
//     "company": "Comsats University Islamabad",
//     "blog": "mdrana.com",
//     "location": "Islamabad, Pakistan",
//     "email": null,
//     "hireable": null,
//     "bio": null,
//     "twitter_username": null,
//     "public_repos": 12,
//     "public_gists": 0,
//     "followers": 3,
//     "following": 2,
//     "created_at": "2022-02-20T14:21:28Z",
//     "updated_at": "2024-05-30T06:27:48Z"
// };