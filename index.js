var express = require('express')
    , session = require('cookie-session')
    , bodyParser = require('body-parser')
    , urlencodedParser = bodyParser.urlencoded({ extended: false })
    , twig = require('twig')
    , UserController = require('./src/user/controllers/UserController')
    , BucketController = require('./src/bucket/controllers/BucketController');

var app = express();
var userCtrl = new UserController();
var bucketCtrl = new BucketController();

/**
 * Spécification du chemin des fichiers static
 * */
app.use(express.static(__dirname + '/ui'))
app.use(express.static(__dirname + '/resources'))
app.use(express.static(__dirname + '/node_modules'))
app.use(bodyParser.json());
app.use(session({secret:'56e58403c41eca0968145793'}))
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.user) == 'undefined') {
        req.session.user = {};
    }
    next();
})
app.set('views', __dirname + '/ui/views/')
app.set('view engine', 'twig')


/**
 * Route par défaut (le home)
 * */
.get('/', function(req, res) {
    res.render('front/home', {});
})
/**
* Renvoie le formulaire d'inscription
**/
.get('/register',function(req,res) {
    res.render('user/signup',{});
})
/**
* Route permettant d'enregistrer un utilisateur
**/
.post('/register', urlencodedParser,function(req,res) {
    userCtrl.registerAction(req,res);
})
/**
 * Route permettant d'uploader les images
 * */
.post('/images/add', urlencodedParser, function(req,res) {
  bucketCtrl.addImagesAction(req,res);
})
.get('/image/delete/:id/:bucketName/:albumName', function(req,res) {
    bucketCtrl.deleteImageAction(req,res);
})
.post('/update', urlencodedParser, function(req,res) {
    userCtrl.updateAction(req,res);
})
.post('/login', urlencodedParser,function(req,res) {
    userCtrl.loginAction(req,res);
})
.get('/login',function(req,res) {
    res.render('user/login',{});
})
.get('/logout', urlencodedParser,function(req,res) {
    userCtrl.logoutAction(req,res);
})
.get('/album/:id', function(req,res) {
    bucketCtrl.albumAction(req,res);
})
/***Route that allows to create user albums**/
.post('/album/create', urlencodedParser,function(req,res) {
    bucketCtrl.addAlbumAction(req,res);
})
/***Route that allows to create user albums**/
.post('/album/update', urlencodedParser,function(req,res) {
    bucketCtrl.updateAlbumAction(req,res);
})
/***Route for delete many objects**/
.get('/album/delete/:id', function(req,res) {
  bucketCtrl.deleteAlbumAction(req,res);
})
.get('/albums', function(req,res) {
    bucketCtrl.albumsAction(req,res);
})
/**
* Route for delete many objects
*/
.get('/admin', function(req,res) {
    userCtrl.adminAction(req,res);
})
.get('/user/delete/:id', function(req,res) {
    userCtrl.deleteUserAccountAction(req,res);
})
.get('/about', function(req,res) {
    res.render('front/about',{});
})
.get('/profile', function(req,res) {
    userCtrl.profileAction(req,res);
})
.get('/account', function(req,res) {
    userCtrl.accountAction(req,res);
})
.get('/images', function(req,res) {
    res.render('bucket/images',{});
})

.get('*', function(req, res) { res.render('404', { title: 'Page Not Found...', code:'404'}); });
/**
 * Launtching the server on port 3000
 * */
app.listen(3000);
console.log("Le serveur écoute sur le port 3000");
