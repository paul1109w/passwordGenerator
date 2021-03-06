# This Project is still Work in Progress and subject to changes. Mainly concerning the UI and documentation

## If you've previously cloned this project please visit the setupDB file again and execute it again

## Available Scripts

In the project directory, you can run:

### 'npm install'

This may have to be executed in order to install all the needed packages, should something change.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Needed files

You should use the included setupDB.sql file in order to create the database needed for the API.
In addition you will need to add this to a server/data/config.js file which should look like the example given below.

```javascript
const mysql = require("mysql");

// Set database connection credentials
const config = {
  host: "127.0.0.1",
  user: "your user",
  password: "password",
  database: "passwordGenerator",
};

const db = mysql.createPool(config);

module.exports = db;
```

### New function to show decrypted passwords

Just open the `localhost:3002/passworddecrypt/yoursecretpassword` where yoursecretpassword also equals the string you
use in your data/secret to few the saved passwords in their original decrypted state at least for the ones where this key
was also used to encrypt the passwords.

The default value for that would be `secret`
