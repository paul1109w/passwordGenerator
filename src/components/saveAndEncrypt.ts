import axios from "axios";

const crypto = require("crypto");

export class encryptSave {
  encryptString: string;

  constructor(passwordEncryptString: string) {
    this.encryptString = passwordEncryptString;
  }
  //encrypt the generated password using the secret in the constSecret file + the crypt-es package
  private encrypt = (data: string) => {
    // crypto-es was to slow here, when using aes for encryption
    var mykey = crypto.createCipher("aes-256-cbc", this.encryptString);
    var encryptedPassword = mykey.update(data, "utf8", "hex");
    encryptedPassword += mykey.final("hex");
    return encryptedPassword;
  };

  // save the encryted password string to the MySQL DB
  save = async (data: string) => {
    const hash = this.encrypt(data);
    const json = {
      passwordHASH: String(hash),
    };

    await axios.post("http://localhost:3002/passwords", json);
  };

  // check if the genrated password is already inside the DB
  checkIfPasswordAlreadyInside = async (data: string): Promise<boolean> => {
    const hash = String(this.encrypt(data));
    var result = await this.checkIfPasswordExists(hash);
    return result;
  };

  // request the password from the API and get true or false back depending on if its inside the DB
  private checkIfPasswordExists = (hash: string) => {
    var url = "http://localhost:3002/passwords/";
    url += hash;

    var valueInDB = axios.get(url).then((response) => {
      return response.data;
    });
    return valueInDB.then((result) => {
      return result;
    });
  };
}
