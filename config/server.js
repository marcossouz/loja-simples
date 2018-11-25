/* importar o módulo do framework express */
var express = require('express');
/* importar o módulo do consign */
var consign = require('consign');
/* importar o módulo do body-parser */
var bodyParser = require('body-parser');
/* importar o módulo do method-override */
var methodOverride = require('method-override');
/* importar o módulo do express-validator */
var expressValidator = require('express-validator');
/* importar o módulo mysql */
var mysql = require('mysql');
/* importar o módulo express-flash */
var flash = require('express-flash');
/* importar o módulo express-myconnection*/
var myconnection = require('express-myconnection');
/* iniciar o objeto do express */
var app = express();

/* importanto configurações */
var config = require('./config')

var dboptions = {
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	port: config.database.port,
	database: config.database.db
}

app.use(myconnection(mysql, dboptions, 'pool'));

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());

/* configurar o middleware body-parser */
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/* configurar o middleware express-validator */
app.use(expressValidator());

app.use(flash());
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);


/* exportar o objeto app */
module.exports = app;