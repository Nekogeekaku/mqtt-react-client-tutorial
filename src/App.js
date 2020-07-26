import React, { useState, Fragment } from 'react';

import PostMessage from './postMessage'
import './App.css';
const mqtt = require('mqtt');
var options = {
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'b0908853'
};

const client  = mqtt.connect('ws://127.0.0.1:9001', options);
client.subscribe('#');

class App extends React.Component {
state={messages:[]}
  constructor () {
   super();
   this.handleSendMessage = this.handleSendMessage.bind(this);
   this.handleMessageReceive = this.handleMessageReceive.bind(this);
}
componentDidMount() {
  client.on('message',this.handleMessageReceive);
}
handleMessageReceive = (topic,message)=>{
  var msg = [topic.toString(),message.toString()];
  this.setState(prevState => ({messages: [...prevState.messages, msg]}))

  //this.state.mesg=message;
}
handleSendMessage = (topic,message)=>{
  console.log("sending " + topic +":"+message);
  client.publish(topic,message);

}
render() {


  return (
    <div className="App">
      <header className="App-header">
        <PostMessage sendMessage={this.handleSendMessage}/>

         <p>The message is: {this.state.mesg}</p>


           <ul>
             {this.state.messages.map((item,index) => (
               <li key={"li"+index}>
                {item[0]}: {item[1]}
               </li>
             ))}
           </ul>


      </header>
    </div>
  );
}
}

export default App;
