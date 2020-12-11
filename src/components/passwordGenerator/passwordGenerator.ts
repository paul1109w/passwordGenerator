import charSets from "../charSet";

const defaultOptions = {
    lowerLetters: true,
    upperLetters: true,
    digits:true,
    specialChars: true,
    parts: {
      amount: 1,
      length: 30,
      delimiter: '/n',
    },
  };
  
  export class PasswordGenerator {
    constructor( public options = {
        lowerLetters: true,
        upperLetters: true,
        digits:true,
        specialChars: true,
        parts: {
          amount: 1,
          length: 30,
          delimiter: '/n',
        }}) {}

     values = this.generatePassword();
    
    

    
    public generatePassword() {
      console.log("Test");
      return ["test","Test"];
    }
  }  