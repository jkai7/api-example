const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',) //=={layout: false}; to not use layout.hbs
});

module.exports = router;
