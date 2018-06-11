// This component is like a portal to a loggedIn user, we have to two kinds of users with different brevileges, one is an 
// admin that can creat accounts for users and one is an organization that can't, while both of them can add new aid search
// a family and update family info

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";

import List from './components/List.jsx';
import Sign from './Sign.jsx'

class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = { 
      new:"",
      redirect: false,
      data:'',
      items: [],
      item: {},
      argsQuery:""
    }
    this.redirect=this.redirect.bind(this);
  }

  redirect(data){
    this.setState({redirect : true, data:data})
  }

  render () {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={this.state.data}/>;
    }
    this.state.new = this.props.username

    if(this.state.new === "#admin" && this.props.loggedIn){
      return (
        <div className='container-fluid animatedMove' style={{ marginTop: '30px'}}>
          <center>
            <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/createAccount')}><strong>Create Account</strong></button>
            <br/>
            <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/query')}><strong>Search</strong></button>
            <br/>
          </center>
        </div>
      )} else if(this.props.loggedIn){
        return (
          <div className='container-fluid animatedMove' style={{ marginTop: '30px'}}>
            <center>
              <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/query')}><strong>Search Family</strong></button>
              <br/>
              <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/invoke')}><strong>Add New Aid</strong></button>
              <br/>
              <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/familyinfo')}><strong>Update Family Information</strong></button>
              <br/>
            </center>
          </div>
      )
      } else{
         return <Redirect to='/login'/>
      }

  }
}

export default App;