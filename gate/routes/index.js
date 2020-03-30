const express = require('express');
const router = express.Router();

const passport = require("passport");
router.use('/user', isLogined, require('./users.js'));
router.use('/products', isLogined, require('./products.js'));


router.post('/login', passport.authenticate('local', {session: true}, null), (req, res) => {
    res.json({result: 'Login Success'});
});


// ログアウト
router.get('/logout', (req, res) => {
    req.logout();
    res.json({result: 'Logout Success'});
});

module.exports = router;

function isLogined(req, res, next) {
    if (req.isAuthenticated()) {
        // 既に認証済みなら対象の URL へのアクセスを許可する
        next();
    } else {
        console.error('認証未済');
        // Angular の HttpClient でエラーコールバックに反応させるため 401 を返す
        res.status(401);
        // HttpClient のエラー時に取得できるエラーメッセージを返す
        res.send({
            error: '認証してください'
        });
    }
}
