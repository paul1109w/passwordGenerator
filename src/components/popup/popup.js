import React from "react";
import "./style.css";

class Popup extends React.Component {
  state = {
    passwordSecretString: String,
  };

  onTodoChange(value) {
    this.setState({
      passwordSecretString: value,
    });
  }
  sendData = () => {
    this.props.parentCallback(this.state.passwordSecretString);
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <label onChange={this.sendData}>
            Please enter the string to encrypt your passwords with
          </label>
          <input
            type="text"
            id="myInput"
            onChange={(e) => this.onTodoChange(e.target.value)}
          ></input>
          <text></text>
          <button onClick={this.sendData}>Submit</button>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;
