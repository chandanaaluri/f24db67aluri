const Galaxy = require('../models/galaxies');

//Get all Read
exports.galaxy_list = async function (req, res) {
    try {
        const galaxies = await Galaxy.find();
        res.render('galaxies', { results: galaxies });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

//create one
exports.galaxy_create_post = async function (req, res) {
    let document = new Galaxy();
    document.name = req.body.name;
    document.inventor = req.body.inventor; // Update to appropriate property for Galaxy if needed
    document.year = req.body.year;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.galaxy_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Galaxy delete DELETE ' + req.params.id);
};

//put one update
exports.galaxy_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Galaxy.findById(req.params.id);
        // Update properties
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.year) toUpdate.year = req.body.year;
        if (req.body.inventor) toUpdate.inventor = req.body.inventor; // Update to appropriate property for Galaxy if needed
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

//read one
exports.galaxy_detail = async function (req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Galaxy.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

//delete one
exports.galaxy_delete = async function (req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Galaxy.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

//single view
exports.galaxy_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Galaxy.findById(req.query.id);
        res.render('galaxiesdetail',
            { title: 'Galaxy Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.galaxy_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('galaxiescreate', { title: 'Galaxy Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

exports.galaxy_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Galaxy.findById(req.query.id)
        res.render('galaxiesupdate', { title: 'Galaxies Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.galaxy_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Galaxy.findById(req.query.id)
        res.render('galaxiesdelete', {
            title: 'Galaxies Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
