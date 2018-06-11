// Here is where it all starts, routing, authentication check and some other stuff are happening here

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import App from './App.jsx';
import Sign from './Sign.jsx';
import Home from './Home.jsx';
import CreateAccount from './CreateAccount.jsx';
import Invoke from './Invoke.jsx';
import Query from './Query.jsx';
import QueryGuest from './QueryGuest.jsx';
import FamilyInfo from './FamilyInfo.jsx';

class Main extends React.Component {
constructor(props) {

super(props);
    this.state = { 
      username:'',
      loggedIn: false,
      x: false
    }
       this.changeUser=this.changeUser.bind(this);
       this.changeLoggedIn=this.changeLoggedIn.bind(this);
       this.signWrap=this.signWrap.bind(this);
       this.appWrap=this.appWrap.bind(this);
       this.queryWrap=this.queryWrap.bind(this);
       this.invokeWrap=this.invokeWrap.bind(this);
       this.createWrap=this.createWrap.bind(this);
       this.familyWrap=this.familyWrap.bind(this);
}
componentDidMount(){
  $.ajax({
    type:'GET',
    url: '/isLogged',
    success: (data) => {
        console.log('worked', data)
        this.setState({
          loggedIn:true,
          username:data,
          x: true
        })
      },
    error:(data) => {
        this.setState({
          x: true
        })
    }
  })
}

changeUser(name){
  this.setState({username: "#"+name})
}

changeLoggedIn(value){
  if(!value){
    $.ajax({
    type:'GET',
    url: '/logout',
    success: (data) => {
        console.log('logged out', data)
      } 

  })
  }
  this.setState({loggedIn: value})
}
signWrap(){
  return <Sign changeUser={this.changeUser} changeLoggedIn={this.changeLoggedIn} loggedIn={this.state.loggedIn}/>
}

appWrap(){
  return <App username={this.state.username} loggedIn={this.state.loggedIn}/>
}
queryWrap(){
  return <Query loggedIn={this.state.loggedIn}/>
}
invokeWrap(){
  return <Invoke loggedIn={this.state.loggedIn}/>
}
createWrap(){
  return <CreateAccount loggedIn={this.state.loggedIn}/>
}
familyWrap(){
  return <FamilyInfo loggedIn={this.state.loggedIn}/>
}
// <h1 style={{'textAlign':'center','fontSize':'300%','fontFamily':'Arial'}} > Fair Share </h1>
  render () {
    return (
      <Router>
      <HashRouter>
      <div>
          <div style={{marginBottom:'100px'}}>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                 <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Home</a></li>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li style={{color:'#17503C'}} >{this.state.loggedIn ? <a id='logout' href='#' onClick={()=> this.changeLoggedIn(false)}>Logout</a> : null}</li>
                  <li>{this.state.loggedIn ? <a href="#/login">Portal</a> : <a href="#/login">Login</a>}</li>
                  <li><a href="#queryGuest">Guest</a></li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="jumbotron text-center f">
          <div>
            <h1>Fair Share</h1> 
            <br/><br/>
          </div>
          </div>

          {this.state.x ?
          <div>
          
          <Route path="/app" render={this.appWrap}/>  
          <Route path="/login" exact render={this.signWrap}/> 
          <Route path="/" exact strict component={Home}/> 
          <Route path="/createAccount" render = {this.createWrap}/>   
          <Route path="/invoke" render = {this.invokeWrap}/>   
          <Route path="/query" render = {this.queryWrap}/>
          <Route path="/queryGuest" component = {QueryGuest}/>
          <Route path="/familyInfo" render = {this.familyWrap}/>
            
          </div>
            : null
           }
          
        </div>
        <div className='footer' style={{ marginTop:'40px'}}>
          <footer >
          <div className="container-fluid">
            <div className='row'>
            <div className='col-sm-6 text-center' style={{ marginLeft:'10px'}}>
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-linkedin"></a>
            <p > Copyrights Reserved &copy;</p>
            </div>

            <div className='col-sm-5'>
            <button className='btn btn-primary btn-lg donateButton'>Donate</button>
            </div>
            </div>
            </div>
          </footer>
          </div>
          </div>
        </HashRouter>
      </Router> 
    )
}
}

ReactDOM.render(<Main />, document.getElementById('app'));