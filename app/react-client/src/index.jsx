import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";

import List from './components/List.jsx';
import Sign from './signing.jsx'

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
    // this.onChange=this.onChange.bind(this);
    this.redirect=this.redirect.bind(this);
    //    this.query=this.query.bind(this);
    // this.queryAll=this.queryAll.bind(this);
  }


  // onChange (e) {
  //   this.setState({

  //    [e.target.name]: e.target.value });
    
  // }

  // query(fcn,args) {
  //   $.ajax({
  //     type:'POST',
  //     url: '/query',
  //     data:{fcn:fcn,args:args}, 
  //     success: (data) => {
  //       console.log(data)
  //       this.setState({
  //         item:data
  //       })
  //     }
  //   });


  // }


 

  // queryAll(fcn,args) {
  //   $.ajax({
  //     type:'POST',
  //     url: '/getAll',
  //     data:{fcn:fcn,args:args}, 
  //     success: (data) => {
  //       console.log(data)
  //       this.setState({
  //         items:data
  //       })
  //     }
  //   });
  // }

  redirect(data){
    this.setState({redirect : true, data:data})
  }
//


  render () {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={this.state.data}/>;
    }
    this.state.new = this.props.username
    // if(this.state.new === "guest"){
    //   console.log(this.state.new)
    //   return <Redirect to='/queryGuest'/>;
    
    //   }else 
    if(this.state.new === "admin" && this.props.loggedIn){
      return (
      <div className='container-fluid animatedMove' style={{ marginTop: '30px'}}>

      <center>
      <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/createAccount')}><strong>Create Account</strong></button>
      <br/>
      <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/query')}><strong>Query</strong></button>
      <br/>
      <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/invoke')}><strong>Invoke</strong></button>
      <br/>
      </center>
      </div>
      )} else if(this.props.loggedIn){
        return (
      <div className='container-fluid animatedMove' style={{ marginTop: '30px'}}>
      <center>
      <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/query')}><strong>Query</strong></button>
      <br/>
      <button className='btn btn-lg choiceButton' onClick={()=> this.redirect('/invoke')}><strong>Invoke</strong></button>
      </center>
      </div>
      )
      } else{
         return <Redirect to='/login'/>
      }

  }
}

export default App;