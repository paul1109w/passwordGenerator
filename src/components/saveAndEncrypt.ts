import CryptoES from "crypto-es";
import { secret } from "./consts/constSecret";
import axios from "axios";

export class encryptSave {
  //encrypt the generated password using the secret in the constSecret file + the crypt-es package
  private encrypt = (data: string) => {
    const hash = CryptoES.HmacSHA512(data, secret);
    console.log(String(CryptoES.HmacSHA512("test", secret)));
    console.log(String(CryptoES.HmacSHA512("test", secret)));
    return hash;
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
