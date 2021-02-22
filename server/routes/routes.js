const db = require("../data/config");

// Route the app
const router = (app) => {
  // Display welcome message on the root

  app.get("/", (request, response) => {
    response.send({
      message: "Welcome to the Node.js Express REST API!",
    });
  });

  // returns all passwords
  app.get("/passwords", (request, response) => {
    db.query("SELECT * FROM savePasswords", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  // returns if specific password hash is already in the DB
  app.get("/passwords/:hash", (request, response) => {
    const hash = request.params.hash;
    db.query(
      "SELECT * FROM savePasswords WHERE passwordHASH = ?;",
      hash,
      (error, result) => {
        if (error) {
          throw error;
        }
        var valueInDB = Object.values(result).length > 0;
        response.send(valueInDB);
      }
    );
  });

  // Adds a new password
  app.post("/passwords", (request, response) => {
    db.query(
      "Insert into savePasswords (passwordHASH) values(?);",
      request.body.passwordHASH,
      (error, result) => {
        if (error) {
          console.log(request.body);
        }

        response.status(201).send(`Password added with ID: ${result.insertID}`);
      }
    );
  });
};

// Export the router
module.exports = router;
