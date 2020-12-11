import logo from './logo.svg';
import './App.css';
import React from "react";
import {TextField, Button} from '@material-ui/core';
import { PasswordGenerator } from "./components/passwordGenerator/passwordGenerator";

export default class App extends React.Component {
  state = {
    options: {
      length: 10,
      upper: true,
      lower: true,
      digits: true,
      special: true,
      amount: 1
    },
    password: ""
  };

  copyPasswordToClipBoard = () => {
    navigator.clipboard.writeText(this.state.password);
  }

  savePasswordToCSV = () => {
    //TODO
  }

  passwordGeneration = async() => {
    const { upper,lower,digits,special} = this.state.options;
    const passwordLength = this.state.options.length;
    const countPasswords =  this.state.options.amount;
    const password = new PasswordGenerator(passwordLength, upper, lower, special, digits,countPasswords);
    console.log(this.state.password);
    await this.setState({ password: password.values});
    console.log(this.state.password);
  } 

  render() {
    return (
      <div className="PasswordGeneratorApp">
        <div className="GeneralContainer">
          <h1>Secure Password Generation</h1>
          <br></br>
          <form className="FormTest" noValidate autoComplete="off">
          <TextField id="outlined-basic" variant="outlined" value = {this.state.password} />
          </form>
          <Button className="PasswordGenerateButton" onClick={() => { this.passwordGeneration()} } variant="contained" >Generate New Passowrd</Button>
        </div>
      </div>
    );
  }
  

}
