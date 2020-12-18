import CryptoES from 'crypto-es';
import {secret} from './consts/constSecret';
import axios from 'axios';

export class encryptSave {
    private encrypt = (data:string) => {
        const hash = CryptoES.HmacSHA512(data, secret);
        return hash;
    }
    private checkForValue(json,value:string):boolean {
        for (let key in json) {
            if (typeof (json[key]) === "object") {
                return this.checkForValue(json[key], value);
            } else if (json[key] === value) {
                return true;
            }
        }
        return false;
    }

    save = async(data:string) => {
        const hash = this.encrypt(data);
        const json = {
            "passwordHASH": String(hash)
        };
        let res = await axios.post('http://localhost:3002/passwords', json);

        console.log(res.data);

    }

    checkIfPasswordAlreadyInside = (data:string) => {
        const hash = String(this.encrypt(data));
        var allExisting = axios.get('http://localhost:3002/passwords').then(response => {
            return response.data;
        });
        var res = allExisting.then(result => {
            console.log(result)
        });
        console.log(res);
        return this.checkForValue(allExisting,hash);
    }

}