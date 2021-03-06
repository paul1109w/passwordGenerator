const secret = require("../data/secret");
const db = require("../data/config");

var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = secret;

// Route the app
const router = (app) => {
  // Display welcome message on the root

  function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  app.get("/", (request, response) => {
    response.send({
      message: "Welcome to the Node.js Express REST API!",
    });
  });

  // returns all passwords decrypted for now as an ugly solution
  app.get("/passworddecrypt/:decryptkey", (request, response) => {
    const decryptkey = request.params.decryptkey;
    if (decryptkey === secret) {
      db.query("CALL getAllPasswords()", (error, result) => {
        if (error) throw error;
        var passwords = [];
        result[0].forEach((element) => {
          var decrypted = decrypt(element.passwordHASH);
          passwords.push(decrypted);
        });

        response.send(passwords);
      });
    }
  });

  app.get("/passwords", (request, response) => {
    db.query("CALL getAllPasswords()", (error, result) => {
      if (error) throw error;

      response.send(result[0]);
    });
  });

  // returns if specific password hash is already in the DB
  app.get("/passwords/:hash", (request, response) => {
    const hash = request.params.hash;
    db.query("CALL getOnePassword(?)", hash, (error, result) => {
      if (error) {
        throw error;
      }
      var valueInDB = Object.values(result[0]).length > 0;
      response.send(valueInDB);
    });
  });

  // Adds a new password
  app.post("/passwords", (request, response) => {
    db.query(
      "CALL insertNewPassword(?)",
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
