const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const session = require('express-session');

const url = 'mongodb://localhost:27042';
const dbName = 'user';

app.use(session({
    secret: '230923',
    resave: false,
    saveUninitialized: true
}));
