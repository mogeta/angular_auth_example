const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
