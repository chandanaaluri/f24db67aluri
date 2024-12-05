// routes/pick.js
const express = require('express');
const router = express.Router();

// GET route to render the randomitem.pug template
router.get('/', (req, res) => {
    const image_names = [ 'item1.jpg', 'item2.jpg', 'item3.jpg', 'item4.jpg', 'item5.jpg'];
    res.render('randomitem', { title: 'A Random Item', image_names: image_names });
});

module.exports = router;
