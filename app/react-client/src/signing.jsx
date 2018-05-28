import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './index.jsx';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";


const input={
  padding: '10px 10px 10px 10px',
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop:'20px',
  color:'black',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};

const button={
  padding:'5px',
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #000000',
  borderRadius: '10px',
  marginTop:'20px',
  fontSize:'20px',
  fontFamily: 'Lobster',
};

const p ={
  color:'#000000',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
class Sign extends React.Component {

constructor(props) {

super(props);
    this.state = { 
      username:'',
      password:'',
      redirect: false

    }
        this.onChange=this.onChange.bind(this);

}

onChange (e) {
  if(e.target.name === 'username'){
    //console.log(e.target.value)
  this.props.changeUser(e.target.value)
}
    this.setState({

     [e.target.name]: e.target.value });
    
  }

  logIn(username,password) {
    $.ajax({
      type:'POST',
      url: '/login',
      data:{username:username,password:password},
      success: () => {
        this.setState({redirect : true})
    }
})
  }


render () {
    const { redirect } = this.state;
       if (redirect) {
         return <Redirect to='/app'/>;
       }
    return (
     
      
      <div>
      
      <p style={p}>USER NAME:</p><input style={input} name='username' onChange={this.onChange} />
      <p style={p} >PASSWORD:</p><input style={input} name='password' onChange={this.onChange} />

      <button  style={button} onClick={()=> this.logIn(this.state.username,this.state.password)}>Sign In </button>
     

      </div>
 

      )

  }

}

export default Sign;