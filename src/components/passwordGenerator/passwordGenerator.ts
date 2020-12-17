import charSets from "../consts/charSet";
import {encryptSave} from "../saveAndEncrypt"

  export class PasswordGenerator {
    passwordLength: number;
    useUpperCase: boolean;
    useLowerCase: boolean;
    useSpecialChars: boolean;
    usedigits: boolean;
    amount: number;
    
    constructor( length: number, upper: boolean, lower: boolean, special:boolean, nums: boolean, amount: number) {
      this.passwordLength = length;
      this.useLowerCase = lower;
      this.useUpperCase = upper;
      this.useSpecialChars = special;
      this.usedigits = nums;
      this.amount = amount;
    }

    
    
    protected generatePassword = ():string[] => {
      let passwordValue = [];
      for(var i = 0 ; i < this.amount; i++) {
        let currentPassword = ''
        for (var j = 0 ; j < this.passwordLength; j++) {
          currentPassword += (String(this.getTurnsForChar()));
        }
        
        var save =  new encryptSave();
        if(save.checkIfPasswordAlreadyInside(currentPassword)) {
          currentPassword = '';
          for (var f = 0 ; f < this.passwordLength; f++) {
            currentPassword += (String(this.getTurnsForChar()));
          }
        }
        passwordValue.push(currentPassword);
        save.save(currentPassword);
  
      }
      console.log(passwordValue)
      return passwordValue;
    }

    private getRandomValueFromChars = (charSetToUse: string[]):string => {
      const radomValue = Math.ceil(Math.random() * charSetToUse.length -1);
      return charSetToUse[radomValue]
    }

    private getTurnsForChar = ():string => {
      const randomValue = Math.floor(Math.random() * 4);
      switch (randomValue) {
        case 0: 
          if(this.usedigits === true){
            return this.getRandomValueFromChars(charSets.digits);
          }
          return this.getTurnsForChar();
        case 1:
          if(this.useLowerCase === true) {
            return this.getRandomValueFromChars(charSets.lower);
          }
          return this.getTurnsForChar();
        case 2: 
          if(this.useSpecialChars === true) {
            return this.getRandomValueFromChars(charSets.special);
          }
          return this.getTurnsForChar();
        case 3: 
          if(this.useUpperCase === true) {
            return this.getRandomValueFromChars(charSets.upper);
          }
          return this.getTurnsForChar();
        default: 
          throw new Error("Test")

      }
    }

  }  