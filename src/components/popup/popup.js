import React from "react";
import "./style.css";
import { secret } from "./../consts/constSecret";
import { Button, Input } from "@material-ui/core";

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

  onKeyUpValue = (e) => {
    if (e.key === "Enter") {
      this.validateInput();
    }
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner" id="lable">
          <label
            id="label"
            variant="outlined"
            style={{
              width: "95%",
              left: "15%",
              bottom: "5%",
              paddingTop: "-25%",
            }}
          >
            {this.state.messageString}
          </label>
          <Input
            type="text"
            id="myInput"
            style={{
              left: "5px",
              right: "105px",
            }}
            variant="text"
            onKeyUp={this.onKeyUpValue}
            onChange={(e) => this.onTodoChange(e.target.value)}
          ></Input>
          <Button
            class="submitButton"
            onClick={this.validateInput}
            style={{
              backgroundColor: "lightGrey",
              felx: 5,
              right: "25px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Popup;
