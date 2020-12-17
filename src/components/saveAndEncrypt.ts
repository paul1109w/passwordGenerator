import CryptoES from 'crypto-es';
import {secret} from './consts/constSecret';

export class encryptSave {
    private encrypt = (data:string) => {
        const hash = CryptoES.HmacSHA512(data, secret);
        return hash;
    }

    save = (data:string) => {
        window.localStorage.setItem(String(this.encrypt(data)), "1");
    }

    checkIfPasswordAlreadyInside = (data:string) => {
        const hash = String(this.encrypt(data));
        return window.localStorage.getItem(hash) === null ? false : true;
    }
}