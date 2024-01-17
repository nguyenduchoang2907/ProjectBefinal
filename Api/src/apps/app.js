const express = require('express');
const config = require('config');

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("views",config.get("app.viewsFolder"));
app.set("view engine",config.get("app.viewEngine"));


app.use(config.get("app.prefixApiVersion"),require(`${__dirname}/../routers/web`));

module.exports = app;