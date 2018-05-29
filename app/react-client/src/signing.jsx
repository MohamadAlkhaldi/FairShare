import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './index.jsx';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";


class Sign extends React.Component {

constructor(props) {

super(props);
    this.state = { 
      username:'',
      password:'',
      redirect: false

    }
        this.onChange=this.onChange.bind(this);
        this.logIn=this.logIn.bind(this);

}

onChange (e) {
  if(e.target.name === 'username'){
    //console.log(e.target.value)
  this.props.changeUser(e.target.value)
}
    this.setState({

     [e.target.name]: e.target.value });
    
  }

  logIn(e) {
    e.preventDefault();
    $.ajax({
      type:'POST',
      url: '/login',
      data:{username:this.state.username,password:this.state.password},
      success: () => {
        console.log("I'm here")
        this.props.changeLoggedIn(true)
    }
})
  }


render () {
    const loggedIn = this.props.loggedIn;
       if (loggedIn) {
         return <Redirect to='/app'/>;
       }
    return (
     
      
      <div >
      
     

      <div className="container animatedMove" style={{ marginTop: '30px'}}>
          <form className="form-inline" >
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter email" name='username' onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} htmlFor="pwd">Password</label>
              <input type="password" className="form-control" id="pwd" placeholder="Enter password" name='password' onChange={this.onChange} />
            </div>
            <button onClick={this.logIn} type="submit" className="login-button"><i className="glyphicon glyphicon-chevron-right"></i></button>
          </form>
        </div>

        <div className="container text-center" style={{marginTop: '80px', color:'#D2D2D2'}}>
        
        <h3 style={{fontFamily:'Merriweather'}}><em>"We have created a blabla bla blab blala"</em></h3>
        <h4 style={{fontFamily:'Merriweather'}}>Mohamad</h4>
        <br/>

        </div>

      </div>
 

      )

  }

}

export default Sign;