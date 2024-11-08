var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('randomitem', { title: "A random item" });
});

module.exports = router;
