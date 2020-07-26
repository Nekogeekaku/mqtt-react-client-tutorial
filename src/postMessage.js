
import React, { useState, Fragment } from 'react';

class PostMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "TOSERVER",
      message: "Hello"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  submitFormHandler = (event) => {
     event.preventDefault();
     let topic = this.state.topic;
     let message = this.state.message;
     this.props.sendMessage(topic,message);
   }

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <label>
          Topic:
          <input
            name="topic"
            type="text"
            value={this.state.topic}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Content:
          <input
            name="message"
            type="text"
            value={this.state.message}
            onChange={this.handleInputChange} />
        </label>
          <input type="submit" value="Send" />
      </form>
    );
  }
}

export default PostMessage;
