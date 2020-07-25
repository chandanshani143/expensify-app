const express = require('express');
const app = express();
const path = require('path');
const { response } = require('express');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {                               //this let us setup some function when someone make get request to our server
    res.sendFile(path.join(publicPath, 'index.html'));      // * tells that whatever the user ask if it is not present in public folder then provide the index.html file
});                             

app.listen(port, () => {
    console.log('servr is up!');
});