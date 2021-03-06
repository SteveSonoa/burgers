// 3. Inside the `burgers_controller.js` file, import the following:

//    * Express
//    * `burger.js`

// 4. Create the `router` for the app, and export the `router` at the end of your file.

// Import the model (burgers.js) to use its database functions.
var burger = require("../models/burgers.js");

module.exports = function(app){
  // Create all our routes and set up logic within those routes where required.
  app.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var burgerObject = {
        burgers: data
      };
      console.log(burgerObject);
      res.render("index", burgerObject);
    });
  });

  app.post("/api/burgers", function(req, res) {
    burger.insertOne(req.body.burgerName, function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id=" + req.params.id;
    console.log("PUT REQUEST ACCESSED");
    console.log(condition);

    burger.updateOne({ devoured: '1' }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
}
