const fetch = require("node-fetch");

fetch('http://localhost:3000/posts')
.then(result => result.json())
.then(data => console.log(data))