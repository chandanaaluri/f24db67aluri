var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');

router.get('/', galaxy_controller.galaxy_list);

router.post('/', galaxy_controller.galaxy_create_post);

//router.get('/:id', galaxy_controller.galaxy_update_get);

//router.get('/:id', galaxy_controller.galaxy_delete_get);

router.put('/galaxies:id', galaxy_controller.galaxy_update_put);

router.delete('/galaxies:id', galaxy_controller.galaxy_delete);

router.get('/galaxies:id', galaxy_controller.galaxy_detail);

router.get('/detail', galaxy_controller.galaxy_view_one_Page);

router.get('/create', galaxy_controller.galaxy_create_Page);

router.get('/update', galaxy_controller.galaxy_update_Page);

router.get('/delete', galaxy_controller.galaxy_delete_Page);

module.exports = router;
