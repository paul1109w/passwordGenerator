import './App.css';
import React from "react";
import { TextField, Button, Slider } from '@material-ui/core';
import { PasswordGenerator } from "./components/passwordGenerator/passwordGenerator";
import { CsvDataService } from './components/csvDownloader'

export default class App extends React.Component {
  state = {
    options: {
      length: 10,
      upper: true,
      lower: true,
      digits: false,
      special: false,
      amount: 1
    },
    password: ""
  };

  copyPasswordToClipBoard = () => {
    navigator.clipboard.writeText(this.state.password);
  }

  savePasswordToCSV = () => {
    const saver = CsvDataService.exportToCsv("passwords.csv",this.state.password);
    return saver;
  }

  handleChange = e => {
    const {name,value} = e.target;
    console.log(name,value)
    const options = {
      ...this.state.options
    };
    console.log(value);
    if(value) {
      options.[name] = true;
    } else {
      options.[name] = false;
    }
    this.setState({ options });
    console.log(this.state)
  }

  handlerUpdateLength = (value) => {
    const options = {
      ...this.state.options
    };
    options.length = Number(value);
    this.setState({ options });
    console.log(this.state)
  }

  handlerUpdateAmount = (value) => {
    const options = {
      ...this.state.options
    };
    options.amount = Number(value);
    this.setState({ options });
    console.log(this.state)
  }

  passwordGeneration = () => {
    const { upper,lower,digits,special} = this.state.options;
    const passwordLength = this.state.options.length;
    const countPasswords =  this.state.options.amount;
    const password = new PasswordGenerator(passwordLength, upper, lower, special, digits,countPasswords);
    var passwords = password.generatePassword();
    this.setState({ password: passwords});
    console.log(window.localStorage.getItem(0));
  } 

  render() {
    return (
      <div className="PasswordGeneratorApp">
        <div className="GeneralContainer">
          <h1>Secure Password Generation</h1>
          <br></br>
        </div>
        <div> 
          <form className="FormTest" noValidate autoComplete="off">
          <TextField id="outlined-basic" variant="outlined" value = {this.state.password} />
          <br></br>
          </form>
          <Button className="CopyToClipBoard" onClick={() => {navigator.clipboard.writeText(this.state.password)}} variant="contained"> Copy to Clipboard</Button>
          <Button className="PasswordGenerateButton" onClick={() => { this.passwordGeneration()} } variant="contained" >Generate New Passowrd</Button>
        </div>
        <div>  
          <Button className="test" onClick={this.savePasswordToCSV}  variant="contained">Save your Passwords to</Button>
          <br></br>
          <Slider 
              className = "sliderPasswordLength"
              value = {this.state.options.length}
              min = {0}
              max = {30}
              step = {2}
              onChange={ (e, val) => this.handlerUpdateLength(val)}  
              valueLabelDisplay="on"
          />       
          <br></br>
        </div>
        <div>
          <Slider
              className = "sliderPasswordAmount"
              value = {this.state.options.amount}
              min = {0}
              max = {30}
              step = {2}
              onChange={ (e, val) => this.handlerUpdateAmount(val)}  
              valueLabelDisplay="on"
          />
          <div>
            <input type="radio" value={true} name="special" onChange= {this.handleChange} checked={this.state.options.special} /> Use Special Chars
            <input type="radio" value={true} name="upper" onChange= {this.handleChange} checked={this.state.options.upper}/> Use UpperCase Chars
            <input type="radio" value={true} name="lower" onChange= {this.handleChange} checked={this.state.options.lower}/> lower
            <input type="radio" value={true} name="digits" onChange = {this.handleChange} checked={this.state.options.digits}/> digits
        </div>
        </div>
      </div>
    );
    
  }

}
