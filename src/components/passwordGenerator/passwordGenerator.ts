import charSets from "../consts/charSet";
import { encryptSave } from "../saveAndEncrypt";

export class PasswordGenerator {
  // init vars to set equal to vals from the constructor
  passwordLength: number;
  useUpperCase: boolean;
  useLowerCase: boolean;
  useSpecialChars: boolean;
  usedigits: boolean;
  amount: number;

  constructor(
    length: number,
    upper: boolean,
    lower: boolean,
    special: boolean,
    nums: boolean,
    amount: number
  ) {
    this.passwordLength = length;
    this.useLowerCase = lower;
    this.useUpperCase = upper;
    this.useSpecialChars = special;
    this.usedigits = nums;
    this.amount = amount;
  }

  protected generatePassword = async (): Promise<string[]> => {
    // return value
    let passwordValue = [];

    //loop to generate the amount of passwords needed
    for (var i = 0; i < this.amount; i++) {
      // generate password with the length in passwordLength
      var save = new encryptSave();
      var currentPassword = await this.genPasswordValue(
        this.passwordLength,
        save
      );

      // push the value of the generated password inside the string array passwordValue
      passwordValue.push(currentPassword);

      // save the generated password inside the DB
      save.save(currentPassword);
    }
    return passwordValue;
  };

  private genPasswordValue = async (
    length: number,
    save: encryptSave
  ): Promise<string> => {
    let currentPassword: string = "";
    for (var j = 0; j < this.passwordLength; j++) {
      currentPassword += String(this.getTurnsForChar());
    }

    // check if password exists in DB
    var passwordExists = await save.checkIfPasswordAlreadyInside(
      currentPassword
    );

    // if it exists generate new one
    if (passwordExists === true) {
      await this.genPasswordValue(length, save);
    }
    return currentPassword;
  };

  private getRandomValueFromChars = (charSetToUse: string[]): string => {
    // get a random value out of the char Sets
    const radomValue = Math.ceil(Math.random() * charSetToUse.length - 1);
    return charSetToUse[radomValue];
  };

  private getTurnsForChar = (): string => {
    // determine which value is next in line to be added to the password string
    const randomValue = Math.floor(Math.random() * 4);
    switch (randomValue) {
      case 0:
        if (this.usedigits === true) {
          return this.getRandomValueFromChars(charSets.digits);
        }
        return this.getTurnsForChar();
      case 1:
        if (this.useLowerCase === true) {
          return this.getRandomValueFromChars(charSets.lower);
        }
        return this.getTurnsForChar();
      case 2:
        if (this.useSpecialChars === true) {
          return this.getRandomValueFromChars(charSets.special);
        }
        return this.getTurnsForChar();
      case 3:
        if (this.useUpperCase === true) {
          return this.getRandomValueFromChars(charSets.upper);
        }
        return this.getTurnsForChar();
      default:
        throw new Error("Something went wrong");
    }
  };
}
