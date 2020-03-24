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
// TODO : 2. ログイン用のルーティングを定義する
// ログイン
app.post('/api/login', passport.authenticate('local', { session: true }), (req, res) => {
  // passport.use('local') で定義した認証処理が成功したらこの関数が実行される
  res.json({ result: 'Login Success' });
});
// TODO : 3. 事前にログイン認証が必要な API のルーティングを定義する
// 遷移時に認証チェックを行う関数
function isLogined(req, res, next) {
  if(req.isAuthenticated()) {
    // 既に認証済みなら対象の URL へのアクセスを許可する
    next();
  }
  else {
    console.error('認証未済');
    // Angular の HttpClient でエラーコールバックに反応させるため 401 を返す
    res.status(401);
    // HttpClient のエラー時に取得できるエラーメッセージを返す
    res.send({
      error: '認証してください'
    });
  }
}

// 事前に認証しておかないとデータを取得できない API を作る
app.get('/api/products', isLogined, (req, res) => {
  res.status(200);
  // 今回はダミーで固定値を返す。実際は DB から取得した値などを返すイメージ
  res.json({
    products: [
      { id: 1, name: '製品 1', price: 500 },
      { id: 2, name: '製品 2', price: 800 },
      { id: 3, name: '製品 3', price: 720 }
    ]
  });
});
// TODO : 4. ログアウト用のルーティングを定義する
// ログアウト
app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ result: 'Logout Success' });
});
// サーバ起動
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
