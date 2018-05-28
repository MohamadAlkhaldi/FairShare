import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";

import App from './index.jsx';
import Sign from './signing.jsx';
import CreateAccount from './createAccount.jsx';
import Invoke from './invoke.jsx';
import Query from './query.jsx';

class Main extends React.Component {
constructor(props) {

super(props);
    this.state = { 
      username:''
    }
       this.changeUser=this.changeUser.bind(this);
       this.fun=this.fun.bind(this);
       this.fun2=this.fun2.bind(this);
}

changeUser(name){

	this.setState({username: name})
	//console.log(this.state.username)
}

fun(){
	return <Sign changeUser={this.changeUser}/>
}

fun2(){
	console.log(this.state.username)
	return <App username={this.state.username}/>
}

	render () {
    return (
      <Router /*history={hashHistory}*/>
          <div>
          <Route path="/app" render={this.fun2}/>   
          <Route path="/" exact strict render={this.fun}/> 
          <Route path="/createAccount" component = {CreateAccount}/>   
          <Route path="/invoke" component = {Invoke}/>   
          <Route path="/query" component = {Query}/>   


        </div>
      </Router> 
    )
}
}

ReactDOM.render(<Main />, document.getElementById('app'));