const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');



// サーバをインスタンス化する
const app = express();



// クッキー設定
app.use(cookieParser());

// セッション設定
app.use(session({
  secret: 'SessionKey',      // クッキーの暗号化に使用するキー
  resave: false,             // セッションチェックする領域にリクエストするたびにセッションを作り直してしまうので false
  saveUninitialized: false,  // 未認証時のセッションを保存しないようにする
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,  // クッキーの有効期限をミリ秒指定 (1週間)
    secure: false                     // HTTP 利用時は false にする
  }
}));

// Passport の初期設定
app.use(passport.initialize());
app.use(passport.session());

// Angular と POST データを受け取るための設定を行う
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// CORS を許可する
app.use((_req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');  // 開発環境で CORS を許可するために入れておいた
  // res.header('Access-Control-Allow-Credentials', true);
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/',express.static('../gateFront/dist/gateFront'));

// TODO : 1. Passport 認証処理を定義する
// 認証ロジック
passport.use('local', new LocalStrategy({
  usernameField: 'userName',  // POST の body から参照するフィールド名を指定する
  passwordField: 'password',  // POST の body から参照するフィールド名を指定する
  session: true,              // セッションを有効にする
  passReqToCallback: true     // 次のコールバック関数の第1引数に request を渡す
}, (_req, userName, password, done) => {
  // ココでは userName と password が固定値と合致すれば、ログインして良いユーザと見なす
  // (実際は DB のデータと照合したりして実装する)

  if(userName === 'ExampleUser' && password === 'MyPassword') {
    // セッションに保存したい情報を用意する
    const userInfo = {
      id: 1,
      userName: userName
    };
    // 認証成功・第2引数で渡す内容がシリアライズされる
    return done(null, userInfo);
  }
  else {
    console.error('認証処理 : 失敗');
    return done(null, false);
  }
}));

// シリアライズ処理
passport.serializeUser((userInfo, done) => {
  done(null, userInfo);
});

// デシリアライズ処理
passport.deserializeUser((userInfo, done) => {
  done(null, userInfo);
});


// サーバ起動
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
var usersRouter = require('./routes/index');
app.use('/api', usersRouter);
