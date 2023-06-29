const express = require('express');
const nodemon = require('nodemon');
const path=require('path')

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
  });
app.use('/stockage', express.static(path.join(__dirname, 'stockage')));

const port = process.env.PORT || 3000;
const routing = require('./routes/routing');
app.use('/api/',routing);
const {mongoose} = require('./dbconnecte');
const { static } = require('express');
app.listen(port, ()=>{console.log(`Le server est est bien démarré sur le port ${port}. Ouvrez le lient http://localhost:${port} pour voir le message`)});

