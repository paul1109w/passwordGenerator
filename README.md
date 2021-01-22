# This Project is still Work in Progress and subject to changes. Mainly concerning the UI and documentation

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

In order to use the saveAndEncrypt class you will have to add the constSecret file here /src/components/consts in order for it to work.
You should also use the included setupDB.sql file in order to create the database needed for the API.
In addition you will need to add this to a server/data/config.js file which should look like the example given below.

```javascript
const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: '127.0.0.1',
    user: 'your user',
    password: 'password',
    database: 'passwordGenerator',
};

const db = mysql.createPool(config);

module.exports = db
```
