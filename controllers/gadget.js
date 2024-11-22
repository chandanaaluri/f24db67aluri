const Gadget = require('../models/gadget');

exports.gadget_list = async function (req, res) {
    try {
        const gadgets = await Gadget.find();
        res.send(gadgets);
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message });
    }
};

exports.gadget_view_all_Page = async function (req, res) {
    try {
        results = await Gadget.find();  // Fetch all gadgets from the DB
        res.render('gadgets', { title: 'Gadgets', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};

// For a specific Gadget
exports.gadget_detail = async function (req, res) {
    console.log("Detail of Gadget with ID:", req.params.id);
    try {
        const result = await Gadget.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Gadget document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
    }
};

// Handle Gadget create on POST
exports.gadget_create_post = async function (req, res) {
    console.log(req.body);
    let document = new Gadget();
    document.name = req.body.name;
    document.brand = req.body.brand;
    document.year_released = req.body.year_released;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for deleting a gadget.
// Query provides the ID
exports.gadget_delete_Page = async function (req, res) {
    console.log("Delete view for gadget with ID " + req.query.id);
    try {
        let result = await Gadget.findById(req.query.id); // Find the gadget by ID
        res.render('gadgetdelete', { title: 'Gadget Delete', toShow: result });
    } catch (err) {
        console.error(err); // Log any error
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle Gadget delete on DELETE
exports.gadget_delete = async function (req, res) {
    console.log("Deleting Gadget with ID:", req.params.id);
    try {
        const result = await Gadget.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Gadget document for ID ${req.params.id} not found"}`);
        } else {
            console.log("Removed:", result);
            res.send(`{"message": "Gadget document with ID ${req.params.id} deleted successfully"}`);
        }
    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).send(`{"error": "Error deleting document for ID ${req.params.id}: ${err.message}"}`);
    }
};

// Handle Gadget update form on PUT.
exports.gadget_update_put = async function (req, res) {
    console.log(`Updating Gadget with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Gadget.findById(req.params.id);

        // Update fields if they are present in the request body
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.brand) toUpdate.brand = req.body.brand;
        if (req.body.year_released) toUpdate.year_released = req.body.year_released;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};

// Handle displaying one Gadget by ID
exports.gadget_view_one_Page = async function (req, res) {
    console.log("Single view for ID:", req.query.id);
    try {
        const result = await Gadget.findById(req.query.id);
        if (!result) {
            res.status(404).send(`{"error": "Gadget with ID ${req.query.id} not found"}`);
        } else {
            res.render('gadgetDetail', {
                title: 'Gadget Detail',
                toShow: result
            });
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a gadget
exports.gadget_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('gadgetcreate', { title: 'Gadget Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a gadget.
// Query provides the id.
exports.gadget_update_Page = async function(req, res) {
    console.log("Update view for gadget with ID " + req.query.id);
    try {
        let result = await Gadget.findById(req.query.id);
        res.render('gadgetupdate', { title: 'Gadget Update', toShow: result });
    } catch (err) {
        res.status(500).send(`{"error": "${err}"}`);
    }
};
