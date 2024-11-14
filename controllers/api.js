// controllers/api.js
exports.api = function(req, res) {
    res.status(200).json({
      resources: [
        { resource: 'gadgets', verbs: ['GET', 'POST', 'PUT', 'DELETE'] }
      ]
    });
  };
  