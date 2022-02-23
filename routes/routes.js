const passport = require('passport');

var authMiddleware = require('../middleware/authMiddleware');
var indexRouter = require('../routes/index');
var authRouter = require('../routes/auth');
var usersRouter = require('../routes/users');
var postsRouter = require('../routes/posts');
var filesRouter = require('./files');
const routerCollection  =  function (app){
    
    app.use('/auth', authRouter);
    app.use('/', authMiddleware, indexRouter);
    app.use('/users', authMiddleware, usersRouter);
    app.use('/posts', authMiddleware, postsRouter);
    app.use('/files', authMiddleware, filesRouter);
} 
module.exports = routerCollection;
