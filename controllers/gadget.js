const Gadget = require('../models/gadget'); // Changed from 'artifacts' to 'gadgets'

// List of all gadgets
exports.gadget_list = async function (req, res) {
  try {
    thegadgets = await Gadget.find();
    res.send(thegadgets);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.gadget_view_all_Page = async function (req, res) {
  try {
    thegadgets = await Gadget.find();
    res.render('gadgets', { title: 'Gadget Search Results', results: thegadgets });
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle gadget create on POST.
exports.gadget_create_post = async function (req, res) {
  console.log(req.body)
  let document = new Gadget();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"gadget_type":"smartphone", "cost":12, "size":"medium"}
  document.gadget_type = req.body.gadget_type;
  document.origin = req.body.origin;
  document.age = req.body.age;
  try {
    let result = await document.save();
    res.send(result);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific gadget.
exports.gadget_detail = async function (req, res) {
  console.log("detail" + req.params.id)
  try {
    result = await Gadget.findById(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

//Handle gadget update form on PUT.
exports.gadget_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Gadget.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `Gadget with id ${req.params.id} not found` });
    }
    // Update properties
    if (req.body.gadget_type) toUpdate.gadget_type = req.body.gadget_type;
    if (req.body.origin) toUpdate.origin = req.body.origin;
    if (req.body.age) toUpdate.age = req.body.age;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.status(200).json(result); // Send a JSON response on success
  } catch (err) {
    res.status(500).send({ error: `${err.message}: Update for id ${req.params.id} failed` });
  }
};

// Delete a gadget by ID
exports.gadget_delete = async function (req, res) {
  try {
    const deletedGadget = await Gadget.findByIdAndDelete(req.params.id);
    if (!deletedGadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }
    res.status(200).json({ message: "Gadget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Handle a show one view with id specified by query
exports.gadget_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id)
  try {
    result = await Gadget.findById(req.query.id)
    res.render('gadgetdetail',
      { title: 'Gadget Detail', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a gadget.
// No body, no in path parameter, no query.
// Does not need to be async
exports.gadget_create_Page = function (req, res) {
  console.log("create view")
  try {
    res.render('gadgetcreate', { title: 'Gadget Create' });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a gadget.
// query provides the id
exports.gadget_update_Page = async function(req, res) {
  console.log("Update view for Gadget with ID " + req.query.id);
  try {
      let result = await Gadget.findById(req.query.id);
      res.render('Gadgetupdate', { title: 'Gadget Update', toShow: result });
  } catch (err) {
      if (err.name === 'ValidationError') {
          // If it's a validation error, render the page with the error message
          res.render('Gadgetupdate', {
              title: 'Gadget Update',
              message: `Error: ${err.message}`,
              toShow: req.body // Preserve any previously entered data in the form
          });
      } else {
          // Handle other types of errors
          res.status(500).send(`{"error": "${err}"}`);
      }
  }
};

// Handle a delete one view with id from query
exports.gadget_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id)
  try {
    result = await Gadget.findById(req.query.id)
    res.render('gadgetdelete', { title: 'Gadget Delete', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

exports.gadget_update_post = async function(req, res) {
  try {
      // Try updating the Gadget
      const updatedSite = await Gadget.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

      if (!updatedSite) {
          return res.status(404).json({ error: 'Gadget not found' });
      }

      // Return a success message if the update is successful
      res.status(200).json({ message: 'Update succeeded', updatedSite });
  } catch (err) {
      // Check if the error is a validation error
      if (err.name === 'ValidationError') {
          // Send back the validation error details to the client
          return res.status(400).json({ error: `Validation failed: ${err.message}` });
      }

      // Handle other types of errors
      res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
};
