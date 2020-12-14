import './App.css';
import React from "react";
import {TextField, Button, Slider} from '@material-ui/core';
import { PasswordGenerator } from "./components/passwordGenerator/passwordGenerator";
import {CsvDataService} from './components/csvDownloader'

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
          <form className="FormTest" noValidate autoComplete="off">
          <TextField id="outlined-basic" variant="outlined" value = {this.state.password} />
          <br></br>
          </form>
          <Button className="CopyToClipBoard" onClick={() => {navigator.clipboard.writeText(this.state.password)}} variant="contained"> Text</Button>
          <Button className="PasswordGenerateButton" onClick={() => { this.passwordGeneration()} } variant="contained" >Generate New Passowrd</Button>
          <Button className="test" onClick={this.savePasswordToCSV}  variant="contained">Button</Button>
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
            <input type="radio" value={!this.state.options.special} name="special" onChange= {this.handleChange} /> Use Special Chars
            <input type="radio" value={true} name="upper" onClick= {this.handleChange} /> Use UpperCase Chars
            <input type="radio" value={true} name="lower" onClick= {this.handleChange}/> lower
            <input type="radio" value={true} name="digits" onClick = {this.handleChange} /> digits
        </div>
        </div>
      </div>
    );
  }
  

}
