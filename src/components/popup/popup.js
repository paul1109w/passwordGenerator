import React from "react";
import "./style.css";
import { secret } from "./../consts/constSecret";

class Popup extends React.Component {
  state = {
    messageString: "Please enter the string to encrypt your passwords with",
  };

  onTodoChange(value) {
    this.setState({
      passwordSecretString: value,
    });
  }

  validateInput = () => {
    if (this.state.passwordSecretString === secret) {
      this.props.closePopup();
    } else {
      this.setState({
        messageString: "Please enter the correct string",
      });
    }
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <label>{this.state.messageString}</label>
          <input
            type="text"
            id="myInput"
            onChange={(e) => this.onTodoChange(e.target.value)}
          ></input>
          <button onClick={this.validateInput}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Popup;
